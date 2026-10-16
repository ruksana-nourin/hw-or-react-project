
import { useEffect } from "react";

interface DeleteModalProps {
    isOpen: boolean;
    itemName?: string;
    isDeleting?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({
    isOpen,
    itemName = "this item",
    isDeleting = false,
    onClose,
    onConfirm,
}: DeleteModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !isDeleting) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, isDeleting, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 sm:p-6"
                onMouseDown={(e) => {
                    if (e.target === e.currentTarget && !isDeleting) {
                        onClose();
                    }
                }}
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-modal-title"
                    className="w-full max-w-xl overflow-hidden rounded-t-xl bg-white shadow-xl dark:bg-gray-800 sm:rounded-xl"
                >
                    {/* Header */}
                    <header className="flex justify-end px-6 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isDeleting}
                            aria-label="Close modal"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                />
                            </svg>
                        </button>
                    </header>

                    {/* Modal Body */}
                    <div className="mb-6 mt-2 px-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.82A2 2 0 004.62 19.7h14.76a2 2 0 001.73-3.02l-7.4-12.82a2 2 0 00-3.46 0z"
                                />
                            </svg>
                        </div>

                        <h3
                            id="delete-modal-title"
                            className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200"
                        >
                            Delete Fee Category?
                        </h3>

                        <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                {itemName}
                            </span>
                            ? This action cannot be undone.
                        </p>
                    </div>

                    {/* Footer */}
                    <footer className="flex flex-col gap-3 bg-gray-50 px-6 py-4 dark:bg-gray-800 sm:flex-row sm:justify-end sm:gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="w-full rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 sm:w-auto sm:py-2.5"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="w-full rounded-lg border border-transparent bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2.5"
                        >
                            {isDeleting ? "Deleting..." : "Confirm Delete"}
                        </button>
                    </footer>
                </div>
            </div>

        </>
    );
}
