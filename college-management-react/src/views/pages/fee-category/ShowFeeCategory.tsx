import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../api";
import type { FeeCategory } from "../../../interfaces/FeeCategory";
import PageHeading from "../../components/PageHeading";
import AlertMessage from "../../components/AlertMsg";

export default function ShowFeeCategory() {
    const { id } = useParams();

    const [feeCategory, setFeeCategory] =
        useState<FeeCategory | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFeeCategory = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await api.get(`fee-categories/${id}`);

                const payload = response.data;

                const category =
                    payload.fee_category ??
                    payload.feeCategory ??
                    payload.data ??
                    payload;

                if (
                    category &&
                    category.id !== undefined &&
                    category.name !== undefined
                ) {
                    setFeeCategory(category);
                } else {
                    setError("Fee category details could not be found.");
                }
            } catch (err: any) {
                setError(
                    err.response?.data?.message ??
                    "Failed to load fee category details."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchFeeCategory();
        } else {
            setError("Invalid fee category ID.");
            setLoading(false);
        }
    }, [id]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <PageHeading
                title="Fee Category Details"
                subtitle="View the details of this fee category."
                buttonText="Back to Fee Categories"
                buttonLink="/fee-categories"
                icon="back"
            />

            {loading ? (
                <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-16 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <svg
                        className="h-5 w-5 animate-spin text-purple-600"
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
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>

                    Loading fee category details...
                </div>
            ) : error ? (
                <div className="max-w-3xl">
                    <AlertMessage type="error" message={error} />

                    <Link
                        to="/fee-categories"
                        className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
                    >
                        Back to Fee Categories
                    </Link>
                </div>
            ) : feeCategory ? (
                <div className="w-full max-w-none overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">                    {/* Card Header */}
                    {/* <div className="border-b border-gray-200 bg-gray-50 px-5 py-6 dark:border-gray-700 dark:bg-gray-800 sm:px-7">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-purple-200 bg-purple-100 text-xl font-bold text-purple-700 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-200">
                                {feeCategory.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {feeCategory.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Fee Category Information
                                </p>
                            </div>
                        </div>
                    </div> */}

                    {/* Category Details */}
                    {/* <div className="p-5 sm:p-7">
                        <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            General Information
                        </h4>

                        <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                            <div className="grid grid-cols-1 gap-2 px-4 py-4 sm:grid-cols-3 sm:gap-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Category ID
                                </p>

                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 sm:col-span-2">
                                    #{feeCategory.id}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-2 px-4 py-4 sm:grid-cols-3 sm:gap-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Category Name
                                </p>

                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 sm:col-span-2">
                                    {feeCategory.name}
                                </p>
                            </div>
                        </div> */}

                    {/* Actions */}
                    {/* <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
                            <Link
                                to="/fee-categories"
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                                Back to List
                            </Link>

                            <Link
                                to={`/fee-categories/${feeCategory.id}/edit`}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 20h9"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 3.5a2.12 2.12 0 013 3L8 18l-4 1 1-4 11.5-11.5z"
                                    />
                                </svg>

                                Edit Category
                            </Link>
                        </div>
                    </div> */}


                    {/* Category Details */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        {/* Section Heading */}
                        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    General Information
                                </h4>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Overview of the selected fee category.
                                </p>
                            </div>

                            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                Category Details
                            </span>
                        </div>

                        {/* Information Cards */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">                            {/* Category ID */}
                            <div className="group rounded-2xl border border-gray-200 bg-gray-50/70 p-5 transition-all duration-200 hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-purple-700 dark:hover:bg-purple-900/10 sm:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 transition-transform duration-200 group-hover:scale-105 dark:bg-purple-900/40 dark:text-purple-300">
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="3"
                                                y="4"
                                                width="18"
                                                height="16"
                                                rx="3"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8 9h8M8 13h4"
                                            />
                                        </svg>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Category ID
                                        </p>

                                        <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            #{feeCategory.id}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                            Unique identification number
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Category Name */}
                            <div className="group rounded-2xl border border-gray-200 bg-gray-50/70 p-5 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-blue-700 dark:hover:bg-blue-900/10 sm:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition-transform duration-200 group-hover:scale-105 dark:bg-blue-900/40 dark:text-blue-300">
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 014 16.5v-11z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 16.5A2.5 2.5 0 016.5 14H20M8 7h7"
                                            />
                                        </svg>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Category Name
                                        </p>

                                        <p className="mt-2 break-words text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {feeCategory.name}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                            Name of the fee category
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Information Note */}
                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-purple-100 bg-purple-50/70 p-4 dark:border-purple-900/50 dark:bg-purple-900/10">
                            <svg
                                className="mt-0.5 h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11v5M12 8h.01"
                                />
                            </svg>

                            <div>
                                <p className="text-sm font-semibold text-purple-900 dark:text-purple-200">
                                    About this category
                                </p>

                                <p className="mt-1 text-sm leading-6 text-purple-800/80 dark:text-purple-300/80">
                                    This page displays the basic information associated
                                    with this fee category. You can edit the category
                                    name whenever an update is needed.
                                </p>
                            </div>
                        </div>
                    </div>


                </div>
            ) : null}
        </div>
    );
}

