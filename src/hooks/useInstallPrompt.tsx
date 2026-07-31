// src/hooks/useInstallPrompt.js
import { useState, useEffect } from 'react'

// 1. Capture the event globally the second the JS file loads
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

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true)
            return
        }

        const handler = (e) => {
            e.preventDefault()
            globalDeferredPrompt = e
            setPrompt(e)
        }

        // If the event was already captured before mount, grab it now
        if (globalDeferredPrompt && !prompt) {
            setPrompt(globalDeferredPrompt)
        }

        window.addEventListener('beforeinstallprompt', handler)
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true)
            globalDeferredPrompt = null
        })

        return () => {
            window.removeEventListener('beforeinstallprompt', handler)
        }
    }, [])

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

    const dismiss = () => setPrompt(null)

    return {
        canInstall: Boolean(prompt || globalDeferredPrompt) && !isInstalled,
        isInstalled,
        install,
        dismiss,
    }
}