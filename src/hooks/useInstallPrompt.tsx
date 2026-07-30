// src/hooks/useInstallPrompt.js
import { useState, useEffect } from 'react'

export function useInstallPrompt() {
    const [prompt, setPrompt] = useState(null)
    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true)
            return
        }

        const handler = (e) => {
            e.preventDefault()
            setPrompt(e)
        }

        window.addEventListener('beforeinstallprompt', handler)
        window.addEventListener('appinstalled', () => setIsInstalled(true))

        return () => {
            window.removeEventListener('beforeinstallprompt', handler)
        }
    }, [])

    const install = async () => {
        if (!prompt) return false
        prompt.prompt()
        const { outcome } = await prompt.userChoice
        if (outcome === 'accepted') {
            setPrompt(null)
            setIsInstalled(true)
        }
        return outcome === 'accepted'
    }

    const dismiss = () => setPrompt(null)

    return {
        canInstall: !!prompt && !isInstalled,
        isInstalled,
        install,
        dismiss,
    }
}