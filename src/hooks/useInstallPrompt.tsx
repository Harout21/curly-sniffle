import { useState, useEffect } from 'react'

// Define interface for standard non-typed beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

// Global reference outside React component lifecycle
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        globalDeferredPrompt = e as BeforeInstallPromptEvent
        window.dispatchEvent(new Event('pwa-deferred-prompt-ready'))
    })
}

export function useInstallPrompt() {
    const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(globalDeferredPrompt)
    const [isInstalled, setIsInstalled] = useState(false)
    const [isDismissed, setIsDismissed] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false
        return localStorage.getItem('pwa_banner_dismissed') === 'true'
    })

    useEffect(() => {
        // Check if running as PWA / Standalone mode
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
            localStorage.removeItem('pwa_banner_dismissed')
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

    const install = async (): Promise<boolean> => {
        const activePrompt = prompt || globalDeferredPrompt

        if (!activePrompt) {
            console.warn('PWA: Install prompt triggered, but no deferred prompt was captured.')
            return false
        }

        try {
            await activePrompt.prompt()
            const { outcome } = await activePrompt.userChoice

            if (outcome === 'accepted') {
                globalDeferredPrompt = null
                setPrompt(null)
                setIsInstalled(true)
                return true
            }
            return false
        } catch (error) {
            console.error('PWA: Error during prompt execution:', error)
            return false
        }
    }

    const dismiss = () => {
        localStorage.setItem('pwa_banner_dismissed', 'true')
        setIsDismissed(true)
        setPrompt(null)
    }

    const canInstall = Boolean(prompt || globalDeferredPrompt) && !isInstalled && !isDismissed

    return {
        canInstall,
        isInstalled,
        install,
        dismiss,
    }
}