import { useState, useEffect } from 'react'

export function IOSInstallHint() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        // 1. Detect iOS devices including modern iPads
        const userAgent = window.navigator.userAgent.toLowerCase()
        const isStandardIOS = /iphone|ipad|ipod/.test(userAgent)
        const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
        const isIOS = isStandardIOS || isIPadOS

        // 2. Ensure browser is iOS Safari (Chrome on iOS 'crios' & Firefox 'fxios' can't install via Share)
        const isSafari = /safari/.test(userAgent) && !/crios|fxios|edgios/.test(userAgent)

        // 3. Strict standalone mode check for iOS Safari
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true

        const dismissed = localStorage.getItem('ios-hint-dismissed') === '1'

        if (isIOS && isSafari && !isStandalone && !dismissed) {
            // Show after a 3 second delay for better UX
            const t = setTimeout(() => setShow(true), 3000)
            return () => clearTimeout(t)
        }
    }, [])

    const dismiss = () => {
        localStorage.setItem('ios-hint-dismissed', '1')
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