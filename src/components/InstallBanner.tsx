import { useInstallPrompt } from '@/hooks/useInstallPrompt'

export function InstallBanner() {
    const { canInstall, install, dismiss } = useInstallPrompt()

    // 1. Return early if Chrome/Edge hasn't captured the install prompt yet,
    // or if the user dismissed/installed it already.
    if (!canInstall) return null

    return (
        <aside
            aria-label="Install App Banner"
            className="fixed bottom-6 left-4 right-4 z-[9999] flex items-center justify-between
                       gap-3 rounded-2xl bg-white p-4 shadow-2xl border border-gray-100 sm:max-w-md sm:mx-auto
                       animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
            <div className="flex items-center gap-3">
                <img
                    src="apple-touch-icon.png"
                    alt="Best Project Logo"
                    className="h-10 w-10 rounded-xl object-cover shadow-xs"
                    width={40}
                    height={40}
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
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                    Not now
                </button>
                <button
                    type="button"
                    onClick={install}
                    className="rounded-lg bg-gray-900 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-gray-800 active:scale-95 transition-all shadow-sm"
                >
                    Install
                </button>
            </div>
        </aside>
    )
}