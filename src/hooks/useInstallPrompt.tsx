import { useState, useEffect, useCallback } from 'react'

// Define interface for standard non-typed beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

// Global reference outside React component lifecycle
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null

// "Not now" hides the banner for 30 seconds, then it reappears automatically
// as long as the app still isn't installed. Stored in sessionStorage (not
// localStorage) so it never survives across tabs/browser restarts and can
// never accidentally suppress the banner permanently.
const DISMISS_KEY = 'pwa_banner_dismissed_at'
const DISMISS_WINDOW_MS = 30_000

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        globalDeferredPrompt = e as BeforeInstallPromptEvent
        window.dispatchEvent(new Event('pwa-deferred-prompt-ready'))
    })
}

function getDismissedAt(): number | null {
    if (typeof window === 'undefined') return null
    const raw = sessionStorage.getItem(DISMISS_KEY)
    if (!raw) return null
    const dismissedAt = Number(raw)
    return Number.isNaN(dismissedAt) ? null : dismissedAt
}

function isWithinDismissWindow(): boolean {
    const dismissedAt = getDismissedAt()
    if (dismissedAt === null) return false
    return Date.now() - dismissedAt < DISMISS_WINDOW_MS
}

export function useInstallPrompt() {
    const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(globalDeferredPrompt)
    const [isInstalled, setIsInstalled] = useState(false)
    const [isDismissed, setIsDismissed] = useState<boolean>(() => isWithinDismissWindow())
    const [isPrompting, setIsPrompting] = useState(false)

    useEffect(() => {
        // Check if running as PWA / Standalone mode. This is the ONLY thing
        // that permanently suppresses the banner - once the app is actually
        // installed, the browser reports display-mode: standalone, so there's
        // nothing to remember in storage to know not to show it again.
        const checkStandalone = () => {
            const isStandaloneMode =
                window.matchMedia('(display-mode: standalone)').matches ||
                (window.navigator as any).standalone === true ||
                document.referrer.includes('android-app://')

            setIsInstalled(isStandaloneMode)
        }

        checkStandalone()

        // Sync prompt if captured before hook mounted
        if (globalDeferredPrompt && !prompt) {
            setPrompt(globalDeferredPrompt)
        }

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault()
            const event = e as BeforeInstallPromptEvent
            globalDeferredPrompt = event
            setPrompt(event)
        }

        const handlePromptReady = () => {
            if (globalDeferredPrompt) {
                setPrompt(globalDeferredPrompt)
            }
        }

        const handleAppInstalled = () => {
            setIsInstalled(true)
            globalDeferredPrompt = null
            setPrompt(null)
            sessionStorage.removeItem(DISMISS_KEY)
        }

        // Media query listener for real-time display mode changes
        const mediaQuery = window.matchMedia('(display-mode: standalone)')
        const handleMediaChange = (e: MediaQueryListEvent) => {
            if (e.matches) setIsInstalled(true)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('pwa-deferred-prompt-ready', handlePromptReady)
        window.addEventListener('appinstalled', handleAppInstalled)

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMediaChange)
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('pwa-deferred-prompt-ready', handlePromptReady)
            window.removeEventListener('appinstalled', handleAppInstalled)
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleMediaChange)
            }
        }
    }, [prompt])

    // While dismissed, count down to the end of the 30s window and flip
    // isDismissed back to false so the banner re-shows on its own - the
    // user doesn't need to reload or navigate for it to reappear.
    useEffect(() => {
        if (!isDismissed) return

        const dismissedAt = getDismissedAt()
        const remaining = dismissedAt === null ? 0 : DISMISS_WINDOW_MS - (Date.now() - dismissedAt)

        if (remaining <= 0) {
            setIsDismissed(false)
            return
        }

        const t = setTimeout(() => setIsDismissed(false), remaining)
        return () => clearTimeout(t)
    }, [isDismissed])

    const install = useCallback(async (): Promise<boolean> => {
        const activePrompt = prompt || globalDeferredPrompt

        if (!activePrompt || isPrompting) {
            console.warn('PWA: Install prompt triggered, but no deferred prompt was captured.')
            return false
        }

        setIsPrompting(true)
        try {
            await activePrompt.prompt()
            const { outcome } = await activePrompt.userChoice

            // A BeforeInstallPromptEvent can only ever be triggered ONCE - Chrome
            // invalidates it right after prompt() resolves, whether the user
            // accepted or dismissed it. Clearing it unconditionally here (not
            // just on "accepted") stops "Install" from silently failing the
            // second time it's tapped.
            globalDeferredPrompt = null
            setPrompt(null)

            if (outcome === 'accepted') {
                setIsInstalled(true)
                return true
            }
            return false
        } catch (error) {
            console.error('PWA: Error during prompt execution:', error)
            globalDeferredPrompt = null
            setPrompt(null)
            return false
        } finally {
            setIsPrompting(false)
        }
    }, [prompt, isPrompting])

    const dismiss = useCallback(() => {
        sessionStorage.setItem(DISMISS_KEY, String(Date.now()))
        setIsDismissed(true)
    }, [])

    const canInstall = Boolean(prompt || globalDeferredPrompt) && !isInstalled && !isDismissed

    return {
        canInstall,
        isInstalled,
        isPrompting,
        install,
        dismiss,
    }
}