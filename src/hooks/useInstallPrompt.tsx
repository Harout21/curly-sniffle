import { useState, useEffect } from 'react'

// Catch event globally before React even mounts
let globalDeferredPrompt = null

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        globalDeferredPrompt = e
        window.dispatchEvent(new Event('pwa-deferred-prompt-ready'))
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
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true

        if (isStandalone) {
            setIsInstalled(true)
            return
        }

        if (globalDeferredPrompt && !prompt) {
            setPrompt(globalDeferredPrompt)
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault()
            globalDeferredPrompt = e
            setPrompt(e)
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

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('pwa-deferred-prompt-ready', handlePromptReady)
        window.addEventListener('appinstalled', handleAppInstalled)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('pwa-deferred-prompt-ready', handlePromptReady)
            window.removeEventListener('appinstalled', handleAppInstalled)
        }
    }, [])

    const install = async () => {
        const activePrompt = prompt || globalDeferredPrompt

        if (!activePrompt) return false

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
            console.error('PWA: Install error:', error)
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