// src/hooks/useInstallPrompt.js
import { useState, useEffect } from 'react'

// Capture the event globally in case it fires before React mounts
let globalDeferredPrompt = null

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        globalDeferredPrompt = e
    })
}

export function useInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(globalDeferredPrompt)
    const [isDismissed, setIsDismissed] = useState(() => {
        return localStorage.getItem('pwa_banner_dismissed') === 'true'
    })

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault()
            globalDeferredPrompt = e
            setDeferredPrompt(e)
        }

        // Check if event was captured prior to hook mount
        if (globalDeferredPrompt) {
            setDeferredPrompt(globalDeferredPrompt)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, [])

    const install = async () => {
        const promptEvent = deferredPrompt || globalDeferredPrompt
        if (!promptEvent) return

        promptEvent.prompt()
        const { outcome } = await promptEvent.userChoice

        if (outcome === 'accepted') {
            globalDeferredPrompt = null
            setDeferredPrompt(null)
        }
    }

    const dismiss = () => {
        localStorage.setItem('pwa_banner_dismissed', 'true')
        setIsDismissed(true)
    }

    // Clear dismissal status helper (useful for testing)
    const resetDismiss = () => {
        localStorage.removeItem('pwa_banner_dismissed')
        setIsDismissed(false)
    }

    const canInstall = Boolean(deferredPrompt || globalDeferredPrompt) && !isDismissed

    return { canInstall, install, dismiss, resetDismiss }
}