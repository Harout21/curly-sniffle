import { useInstallPrompt } from '@/hooks/useInstallPrompt'

export function InstallBanner() {
    const { canInstall, install, dismiss } = useInstallPrompt()

    const isMobile = typeof window !== 'undefined' && /android|iphone|ipad|ipod/i.test(navigator.userAgent)

    if (!canInstall || !isMobile) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between
                    gap-3 rounded-2xl bg-white p-4 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3">
                <img src="/apple-touch-icon.png" alt="App icon" className="h-10 w-10 rounded-xl" />
                <div>
                    <p className="text-sm font-semibold text-gray-900">Install Best Project</p>
                    <p className="text-xs text-gray-500">Add to your home screen</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={dismiss}
                    className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100"
                >
                    Not now
                </button>
                <button
                    onClick={install}
                    className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700"
                >
                    Install
                </button>
            </div>
        </div>
    )
}