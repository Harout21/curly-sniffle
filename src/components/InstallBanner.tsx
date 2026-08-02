import { useInstallPrompt } from '@/hooks/useInstallPrompt'

export function InstallBanner() {
    const { canInstall, install, dismiss } = useInstallPrompt()

    // 1. If Chrome has not fired the event yet (or it was dismissed/installed), hide the banner.
    // As soon as the custom hook catches the event, this component will re-render and canInstall becomes true.
    if (!canInstall) return null

    return (
        <div className="fixed bottom-6 left-4 right-4 z-[9999] flex items-center justify-between
                    gap-3 rounded-2xl bg-white p-4 shadow-2xl border border-gray-100 sm:max-w-md sm:mx-auto">
            <div className="flex items-center gap-3">
                <img
                    src="/apple-touch-icon.png"
                    alt="Best Project Icon"
                    className="h-10 w-10 rounded-xl object-cover"
                />
                <div>
                    <p className="text-sm font-semibold text-gray-900">Install Best Project</p>
                    <p className="text-xs text-gray-500">Add to home screen for faster access</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={dismiss}
                    className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 transition-colors"
                >
                    Not now
                </button>
                <button
                    type="button"
                    onClick={install}
                    className="rounded-lg bg-gray-900 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-gray-800 transition-colors shadow-sm"
                >
                    Install
                </button>
            </div>
        </div>
    )
}