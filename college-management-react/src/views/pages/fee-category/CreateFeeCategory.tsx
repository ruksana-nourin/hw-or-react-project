import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../../api";
import {
    defaultFeeCategory,
    type FeeCategory,
    type FeeCategoryErrors,
} from "../../../interfaces/FeeCategory";
import AlertMessage from "../../components/AlertMsg";
import PageHeading from "../../components/PageHeading";

export default function CreateFeeCategory() {
    const navigate = useNavigate();

    const [feeCategory, setFeeCategory] = useState<FeeCategory>({
        ...defaultFeeCategory,
    });

    const [errors, setErrors] = useState<FeeCategoryErrors>({});
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrors({});
        setApiError("");

        const name = feeCategory.name.trim();

        if (!name) {
            setErrors({
                name: "Fee category name is required.",
            });
            return;
        }

        setLoading(true);

        try {
            await api.post("fee-categories", { name });

            navigate("/fee-categories", {
                state: {
                    successMessage: "Fee category created successfully!",
                },
            });
        } catch (error: any) {
            const response = error.response;

            if (response?.status === 422) {
                setErrors({
                    name:
                        response.data.errors?.name?.[0] ??
                        "Please enter a valid category name.",
                });
            } else {
                setApiError(
                    response?.data?.message ??
                    "Failed to create fee category. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full p-4 sm:p-6 lg:p-8">
            {/* Page heading */}
            <PageHeading 
            title="Create Fee Category" 
                subtitle="Create a new fee category."
                buttonText="Back to Fee Categories"
                buttonLink="/fee-categories"
                buttonColor="blue"
                icon="back"
            />
            

            <div className="max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                {/* Card heading */}
                <div className="border-b border-gray-200 px-5 py-5 dark:border-gray-700 sm:px-7">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 5v14m-7-7h14"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                Category Information
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Enter the basic details below.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-6 px-5 py-6 sm:px-7 sm:py-8">
                        {apiError && (
                            <AlertMessage
                                type="error"
                                message={apiError}
                                onClose={() => setApiError("")}
                            />
                        )}

                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200"
                            >
                                Fee Category Name
                                <span className="ml-1 text-red-600">*</span>
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoFocus
                                value={feeCategory.name}
                                onChange={(event) => {
                                    setFeeCategory({
                                        ...feeCategory,
                                        name: event.target.value,
                                    });

                                    setErrors({
                                        ...errors,
                                        name: undefined,
                                    });
                                    setApiError("");
                                }}
                                placeholder="e.g. Tuition Fee"
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={
                                    errors.name ? "name-error" : "name-help"
                                }
                                className={`block w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:ring-4 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 ${errors.name
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-900/30"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
                                    }`}
                            />

                            {errors.name ? (
                                <p
                                    id="name-error"
                                    className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-600 dark:text-red-400"
                                >
                                    <svg
                                        className="mt-0.5 h-4 w-4 shrink-0"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM9 5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm1 4a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.name}
                                </p>
                            ) : (
                                <p
                                    id="name-help"
                                    className="mt-2 text-xs text-gray-500 dark:text-gray-400"
                                >
                                    Use a clear name, such as Tuition Fee,
                                    Admission Fee, or Exam Fee.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Form actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-5 dark:border-gray-700 dark:bg-gray-800/60 sm:flex-row sm:justify-end sm:px-7">
                        <Link
                            to="/fee-categories"
                            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-blue-900/40"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                                        />
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.2a1 1 0 0 1-1.414 0l-3.3-3.3a1 1 0 0 1 1.414-1.414l2.593 2.593 6.493-6.493a1 1 0 0 1 1.408 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Save Category
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Fields marked with <span className="text-red-600">*</span> are
                required.
            </p>
        </div>
    );
}