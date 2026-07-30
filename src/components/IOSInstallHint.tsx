// src/components/IOSInstallHint.jsx
import { useState, useEffect } from 'react'

export function IOSInstallHint() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        const dismissed = localStorage.getItem('ios-hint-dismissed')

        if (isIOS && !isStandalone && !dismissed) {
            // Show after a short delay so it doesn't feel jarring
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
        <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-gray-900 p-4 text-white shadow-xl">
            <button onClick={dismiss} className="absolute right-3 top-3 text-gray-400 hover:text-white">
                ✕
            </button>
            <p className="text-sm font-semibold mb-1">Install this app</p>
            <p className="text-xs text-gray-300">
                Tap <span className="inline-block">⬆️</span> <strong>Share</strong> then{' '}
                <strong>Add to Home Screen</strong>
            </p>
        </div>
    )
}