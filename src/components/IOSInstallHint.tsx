import { useState, useEffect } from 'react'

// Same behavior as useInstallPrompt.tsx: sessionStorage only, re-ask after 30s.
const DISMISS_KEY = 'ios_hint_dismissed_at'
const DISMISS_WINDOW_MS = 30_000

function getDismissedAt(): number | null {
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

export function IOSInstallHint() {
    const [show, setShow] = useState(false)
    const [isEligible, setIsEligible] = useState(false)
    const [isDismissed, setIsDismissed] = useState<boolean>(() => isWithinDismissWindow())

    // Determine once whether this device/browser can even use the hint.
    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        const isStandardIOS = /iphone|ipad|ipod/.test(userAgent)
        const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
        const isIOS = isStandardIOS || isIPadOS

        // Chrome on iOS 'crios' & Firefox 'fxios' can't install via Share
        const isSafari = /safari/.test(userAgent) && !/crios|fxios|edgios/.test(userAgent)

        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true

        setIsEligible(isIOS && isSafari && !isStandalone)
    }, [])

    // Show after a 3s delay when eligible and not currently dismissed; while
    // dismissed, count down the remaining time and flip back automatically -
    // this re-runs every time isDismissed changes, so it keeps re-asking
    // every 30s instead of only checking once on mount.
    useEffect(() => {
        if (!isEligible) return

        if (isDismissed) {
            const dismissedAt = getDismissedAt()
            const remaining = dismissedAt === null ? 0 : DISMISS_WINDOW_MS - (Date.now() - dismissedAt)
            if (remaining <= 0) {
                setIsDismissed(false)
                return
            }
            const t = setTimeout(() => setIsDismissed(false), remaining)
            return () => clearTimeout(t)
        }

        const t = setTimeout(() => setShow(true), 3000)
        return () => clearTimeout(t)
    }, [isEligible, isDismissed])

    const dismiss = () => {
        sessionStorage.setItem(DISMISS_KEY, String(Date.now()))
        setIsDismissed(true)
        setShow(false)
    }

    if (!show) return null

    return (
        <aside
            aria-label="iOS Installation Guide"
            className="fixed bottom-6 left-4 right-4 z-[9999] rounded-2xl bg-gray-900 p-4 text-white shadow-2xl border border-gray-800 sm:max-w-md sm:mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
            <button
                onClick={dismiss}
                aria-label="Close install guide"
                className="absolute right-3 top-3 rounded-lg p-1 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
                ✕
            </button>
            <div className="pr-6">
                <p className="text-sm font-semibold mb-1">Install Best Project</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                    Tap <span className="inline-block px-1 font-bold">⎋</span> (Share) in Safari's bottom toolbar, then select <strong>'Add to Home Screen'</strong>.
                </p>
            </div>
        </aside>
    )
}