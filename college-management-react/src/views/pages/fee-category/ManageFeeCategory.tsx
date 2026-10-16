
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { api } from "../../../api";
import type { FeeCategory } from "../../../interfaces/FeeCategory";
import { useLocation, useNavigate } from "react-router";
import AlertMessage from "../../components/AlertMsg";
import PageHeading from "../../components/PageHeading";
import DeleteModal from "../../components/DeleteModal";


export default function ManageFeeCategory() {
    const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<FeeCategory | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();



    const perPage = 10;

    const fetchFeeCategories = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("fee-categories");
            const payload = response.data;

            const categories: FeeCategory[] = Array.isArray(payload)
                ? payload
                : Array.isArray(payload.fee_categories)
                    ? payload.fee_categories
                    : Array.isArray(payload.data)
                        ? payload.data
                        : [];

            setFeeCategories(categories);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to load fee categories. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeeCategories();
    }, []);

    const filteredCategories = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return feeCategories.filter((category) =>
            category.name.toLowerCase().includes(keyword)
        );
    }, [feeCategories, search]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredCategories.length / perPage)
    );

    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    // const handleDelete = async (category: FeeCategory) => {
    //     const confirmed = window.confirm(
    //         `Are you sure you want to delete "${category.name}"?`
    //     );

    //     if (!confirmed) return;

    //     try {
    //         setDeletingId(category.id);
    //         setError("");

    //         await api.delete(`fee-categories/${category.id}`);

    //         const updatedCategories = feeCategories.filter(
    //             (item) => item.id !== category.id
    //         );

    //         setFeeCategories(updatedCategories);

    //         const remainingResults = updatedCategories.filter((item) =>
    //             item.name.toLowerCase().includes(search.toLowerCase().trim())
    //         ).length;

    //         const lastPage = Math.max(
    //             1,
    //             Math.ceil(remainingResults / perPage)
    //         );

    //         setCurrentPage((page) => Math.min(page, lastPage));
    //     } catch (err: any) {
    //         setError(
    //             err.response?.data?.message ||
    //             "Failed to delete fee category. Please try again."
    //         );
    //     } finally {
    //         setDeletingId(null);
    //     }
    // };

    const handleDelete = (category: FeeCategory) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        if (deletingId !== null) return;

        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
    };

    const confirmDelete = async () => {
        if (!selectedCategory) return;

        try {
            setDeletingId(selectedCategory.id);

            await api.delete(`fee-categories/${selectedCategory.id}`);

            setFeeCategories((prev) =>
                prev.filter((category) => category.id !== selectedCategory.id)
            );

            setIsDeleteModalOpen(false);
            setSelectedCategory(null);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to delete fee category."
            );
        } finally {
            setDeletingId(null);
        }
    };
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const state = location.state as
            | { successMessage?: string }
            | null;

        if (state?.successMessage) {
            setSuccessMessage(state.successMessage);

            navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
    }, [location.state, location.pathname, navigate]);

    return (
        <main className="w-full min-w-0">
            <div className="grid w-full min-w-0 px-6">

                {/* Page Heading */}

                <PageHeading
                    title="Fee Categories"
                    subtitle="Manage fee categories for your college."
                    buttonText="Add Category"
                    buttonLink="/fee-categories/create"
                    // buttonColor=""
                    icon="plus"
                />

                {/* Success Message */}
                {successMessage && (
                    <AlertMessage
                        type="success"
                        message={successMessage}
                        onClose={() => setSuccessMessage("")}
                    />
                )}

                {/* Category Table */}
                <div className="w-full overflow-hidden rounded-lg shadow-xs bg-white dark:bg-gray-800">

                    {/* Search */}
                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.817-4.817A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search fee category..."
                                className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg dark:placeholder-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                            />
                        </div>

                        <button
                            type="button"
                            // onClick={fetchFeeCategories}
                            onClick={() => {
                                setSearch("");
                                setCurrentPage(1);
                            }}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 disabled:opacity-50"
                        >
                            Refresh
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div
                            role="alert"
                            className="mx-4 mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:text-red-200 dark:bg-red-900/30"
                        >
                            {error}
                        </div>
                    )}

                    {/* Responsive Table */}

                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white-400">
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Category Name</th>
                                    <th className="px-4 py-3">Category ID</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-10 text-sm text-center text-gray-500 dark:text-gray-400"
                                        >
                                            Loading fee categories...
                                        </td>
                                    </tr>
                                ) : paginatedCategories.map((category, index) => (
                                    <tr
                                        key={category.id}
                                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            {(currentPage - 1) * perPage + index + 1}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 mr-3 font-semibold text-purple-700 bg-purple-100 rounded-full dark:text-purple-100 dark:bg-purple-700">
                                                    {category.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <span className="font-semibold">
                                                    {category.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-sm">
                                            {category.id}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    to={`/fee-categories/${category.id}`}
                                                    title="View category"
                                                    aria-label={`View ${category.name}`}
                                                    className="rounded-lg border border-purple-200 bg-white p-2 text-purple-600 transition hover:border-purple-400 hover:bg-purple-100 dark:border-gray-600 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542-7-9.542-7-9.542-7z"
                                                        />
                                                    </svg>
                                                </Link>

                                                <Link
                                                    to={`/fee-categories/${category.id}/edit`}
                                                    title="Edit category"
                                                    aria-label={`Edit ${category.name}`}
                                                    className="rounded-lg border border-blue-200 bg-white p-2 text-blue-600 transition hover:border-blue-400 hover:bg-blue-100 dark:border-gray-600 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                                                        />
                                                    </svg>
                                                </Link>

                                                <button
                                                    type="button"
                                                    title="Delete category"
                                                    aria-label={`Delete ${category.name}`}
                                                    disabled={deletingId === category.id}
                                                    onClick={() => handleDelete(category)}
                                                    className="rounded-lg border border-red-200 bg-white p-2 text-red-600 transition hover:border-red-900 hover:bg-red-100 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                                                >
                                                    {deletingId === category.id ? (
                                                        <span className="text-xs">...</span>
                                                    ) : (
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M3 6h18M8 6V4h8v2m-9 0l1 14h8l1-14M10 11v5m4-5v5"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {!loading && paginatedCategories.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-10 text-sm text-center text-gray-500 dark:text-gray-400"
                                        >
                                            {error
                                                ? "Could not load fee categories."
                                                : "No fee categories found. Try another search or add a category."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>


                    {/* Pagination */}
                    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-2 dark:bg-gray-800 dark:text-gray-400">
                        <span className="flex items-center">
                            Showing{" "}
                            {filteredCategories.length === 0
                                ? 0
                                : (currentPage - 1) * perPage + 1}
                            {" - "}
                            {Math.min(
                                currentPage * perPage,
                                filteredCategories.length
                            )}
                            {" of "}
                            {filteredCategories.length} categories
                        </span>

                        <span className="flex mt-2 sm:mt-auto sm:justify-end">
                            <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center gap-1">
                                    <li>
                                        <button
                                            type="button"
                                            disabled={currentPage === 1 || loading}
                                            onClick={() =>
                                                setCurrentPage((page) =>
                                                    Math.max(1, page - 1)
                                                )
                                            }
                                            className="px-3 py-1 rounded-md hover:bg-purple-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                            aria-label="Previous page"
                                        >
                                            &larr;
                                        </button>
                                    </li>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => index + 1
                                    ).map((page) => (
                                        <li key={page}>
                                            <button
                                                type="button"
                                                disabled={loading}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 rounded-md transition-colors ${currentPage === page
                                                    ? "text-white bg-purple-600 border border-purple-600"
                                                    : "hover:bg-purple-100 dark:hover:bg-gray-700"
                                                    }`}
                                                aria-current={
                                                    currentPage === page
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))}

                                    <li>
                                        <button
                                            type="button"
                                            disabled={
                                                currentPage === totalPages || loading
                                            }
                                            onClick={() =>
                                                setCurrentPage((page) =>
                                                    Math.min(totalPages, page + 1)
                                                )
                                            }
                                            className="px-3 py-1 rounded-md hover:bg-purple-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                            aria-label="Next page"
                                        >
                                            &rarr;
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </span>
                    </div>
                </div>
            </div>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                itemName={selectedCategory?.name}
                isDeleting={deletingId !== null}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
        </main>

    );

}