import { useEffect } from "react";

interface AlertMessageProps {
    type?: "success" | "error";
    message: string;
    onClose?: () => void;
}

export default function AlertMessage({
    type = "success",
    message,
    onClose,
}: AlertMessageProps) {
    useEffect(() => {
        if (!onClose) return;

        // const timer = setTimeout(onClose, 4000);

        // return () => clearTimeout(timer);
    }, [onClose, message]);

    if (!message) return null;

    const isSuccess = type === "success";

    return (
        <div
            role={isSuccess ? "status" : "alert"}
            className={`mb-5 flex items-start gap-3 rounded-xl border p-4 ${isSuccess
                    ? "border-green-500 bg-green-100 text-green-900 dark:border-green-500 dark:bg-green-900 dark:text-green-100"
                    : "border-red-500 bg-red-100 text-red-900 dark:border-red-500 dark:bg-red-900 dark:text-red-100"
                }`}
        >
            <div className="mt-0.5 shrink-0">
                {isSuccess ? (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM9 5a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0V5Zm1 9a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 10 14Z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                    {isSuccess ? "Success!" : "Error!"}
                </p>

                <p className="mt-1 text-sm">{message}</p>
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Dismiss message"
                    className="rounded-md p-1 opacity-70 hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
                >
                    <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}