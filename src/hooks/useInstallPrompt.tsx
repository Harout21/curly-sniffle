import { useState, useEffect } from 'react'

let globalDeferredPrompt = null

// Capture the event at the earliest possible moment
if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        globalDeferredPrompt = e
        // Dispatch a custom event so active hooks catch it even if mounted late
        window.dispatchEvent(new Event('pwa-prompt-available'))
    })
}

export function useInstallPrompt() {
    const [prompt, setPrompt] = useState(globalDeferredPrompt)
    const [isInstalled, setIsInstalled] = useState(false)
    const [isDismissed, setIsDismissed] = useState(() => {
        if (typeof window === 'undefined') return false
        return localStorage.getItem('pwa_banner_dismissed') === 'true'
    })

    useEffect(() => {
        // 1. Check if app is already running as standalone PWA
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true // Fallback for iOS Safari

        if (isStandalone) {
            setIsInstalled(true)
            return
        }

        // 2. Sync global prompt state on mount
        if (globalDeferredPrompt) {
            setPrompt(globalDeferredPrompt)
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault()
            globalDeferredPrompt = e
            setPrompt(e)
        }

        const handlePromptAvailable = () => {
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

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('pwa-prompt-available', handlePromptAvailable)
        window.addEventListener('appinstalled', handleAppInstalled)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('pwa-prompt-available', handlePromptAvailable)
            window.removeEventListener('appinstalled', handleAppInstalled)
        }
    }, []) // Empty dependency array prevents re-render loops

    const install = async () => {
        const activePrompt = prompt || globalDeferredPrompt

        if (!activePrompt) {
            console.warn('PWA: No active install prompt event found.')
            return false
        }

        try {
            await activePrompt.prompt()
            const { outcome } = await activePrompt.userChoice

            if (outcome === 'accepted') {
                globalDeferredPrompt = null
                setPrompt(null)
                setIsInstalled(true)
            }
            return outcome === 'accepted'
        } catch (error) {
            console.error('PWA: Error triggering install prompt:', error)
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