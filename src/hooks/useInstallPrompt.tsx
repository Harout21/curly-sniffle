import { useState, useEffect } from 'react'

let globalDeferredPrompt = null

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        globalDeferredPrompt = e
    })
}

export function useInstallPrompt() {
    const [prompt, setPrompt] = useState(globalDeferredPrompt)
    const [isInstalled, setIsInstalled] = useState(false)
    const [isDismissed, setIsDismissed] = useState(() => {
        return localStorage.getItem('pwa_banner_dismissed') === 'true'
    })

    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true)
            return
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault()
            globalDeferredPrompt = e
            setPrompt(e)
        }

        const handleAppInstalled = () => {
            setIsInstalled(true)
            globalDeferredPrompt = null
            setPrompt(null)
            localStorage.removeItem('pwa_banner_dismissed')
        }

        if (globalDeferredPrompt && !prompt) {
            setPrompt(globalDeferredPrompt)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.addEventListener('appinstalled', handleAppInstalled)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
            window.removeEventListener('appinstalled', handleAppInstalled)
        }
    }, [prompt])

    const install = async () => {
        const activePrompt = prompt || globalDeferredPrompt
        if (!activePrompt) return false

        activePrompt.prompt()
        const { outcome } = await activePrompt.userChoice

        if (outcome === 'accepted') {
            globalDeferredPrompt = null
            setPrompt(null)
            setIsInstalled(true)
        }
        return outcome === 'accepted'
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