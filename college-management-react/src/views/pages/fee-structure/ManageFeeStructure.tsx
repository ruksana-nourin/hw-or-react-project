
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { api } from "../../../api";
import type { FeeStructure } from "../../../interfaces/FeeStructure";
import AlertMessage from "../../components/AlertMsg";
import PageHeading from "../../components/PageHeading";
import DeleteModal from "../../components/DeleteModal";

interface FeeCategoryOption {
    id: number;
    name: string;
}

interface SemesterOption {
    id: number;
    name: string;
    academic_session?: {
        id: number;
        name: string;
    };
    academicSession?: {
        id: number;
        name: string;
    };
}

interface FeeStructureItem extends FeeStructure {
    semester?: SemesterOption;
    fee_category?: FeeCategoryOption;
    feeCategory?: FeeCategoryOption;
}

export default function ManageFeeStructure() {
    const [feeStructures, setFeeStructures] = useState<FeeStructureItem[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [selectedStructure, setSelectedStructure] =
        useState<FeeStructureItem | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const perPage = 10;

    const fetchFeeStructures = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("fee-structures");
            const payload = response.data;

            const structures: FeeStructureItem[] = Array.isArray(payload)
                ? payload
                : Array.isArray(payload.fee_structures)
                    ? payload.fee_structures
                    : Array.isArray(payload.data)
                        ? payload.data
                        : [];

            setFeeStructures(structures);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to load fee structures. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeeStructures();
    }, []);

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

    const getCategory = (item: FeeStructureItem) =>
        item.fee_category ?? item.feeCategory;

    const getAcademicSession = (item: FeeStructureItem) => {
        return (
            item.semester?.academic_session?.name ??
            item.semester?.academicSession?.name ??
            "—"
        );
    };

    const getSession = (item: FeeStructureItem) =>
        item.semester?.academic_session ??
        item.semester?.academicSession;


    const filteredStructures = useMemo(() => {
        const keyword = search.toLowerCase();

        return feeStructures.filter((item) => {
            return (
                getCategory(item)?.name?.toLowerCase().includes(keyword) ||
                getAcademicSession(item)?.toLowerCase().includes(keyword) ||
                item.semester?.name?.toLowerCase().includes(keyword) ||
                String(item.id).includes(keyword) ||
                String(item.amount).includes(keyword)
            );
        });
    }, [feeStructures, search]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredStructures.length / perPage)
    );

    const paginatedStructures = filteredStructures.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleDelete = (structure: FeeStructureItem) => {
        setSelectedStructure(structure);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        if (deletingId !== null) return;

        setIsDeleteModalOpen(false);
        setSelectedStructure(null);
    };

    const confirmDelete = async () => {
        if (!selectedStructure) return;

        try {
            setDeletingId(selectedStructure.id);
            setError("");

            await api.delete(`fee-structures/${selectedStructure.id}`);

            const updatedStructures = feeStructures.filter(
                (item) => item.id !== selectedStructure.id
            );

            setFeeStructures(updatedStructures);

            const remainingResults = updatedStructures.filter((item) => {
                const keyword = search.toLowerCase().trim();

                return [
                    getCategory(item)?.name ?? "",
                    item.semester?.name ?? "",
                    getSession(item)?.name ?? "",
                    String(item.id),
                    String(item.amount),
                ].some((value) => value.toLowerCase().includes(keyword));
            }).length;

            const lastPage = Math.max(
                1,
                Math.ceil(remainingResults / perPage)
            );

            setCurrentPage((page) => Math.min(page, lastPage));
            setIsDeleteModalOpen(false);
            setSelectedStructure(null);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to delete fee structure. Please try again."
            );
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <main className="w-full min-w-0">
            <div className="grid w-full min-w-0 px-6">

                {/* Page Heading */}
                <PageHeading
                    title="Fee Structures"
                    subtitle="Manage fee structures for your college."
                    buttonText="Add Fee Structure"
                    buttonLink="/fee-structures/create"
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

                {/* Fee Structure Table */}
                <div className="w-full overflow-hidden rounded-lg bg-white shadow-xs dark:bg-gray-800">

                    {/* Search and Refresh */}
                    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:max-w-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg
                                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
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
                                placeholder="Search fee structure..."
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                            />
                        </div>

                        <button
                            type="button"
                            // onClick={fetchFeeStructures}
                            onClick={() => {
                                setSearch("");
                                setCurrentPage(1);
                            }}
                            disabled={loading}
                            className="rounded-lg border border-purple-600 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 disabled:opacity-50 dark:hover:bg-gray-700"
                        >
                            Refresh
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div
                            role="alert"
                            className="mx-4 mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200"
                        >
                            {error}
                        </div>
                    )}

                    {/* Responsive Table */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Fee Category</th>
                                    <th className="px-4 py-3">Session</th>
                                    <th className="px-4 py-3">Semester</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            Loading fee structures...
                                        </td>
                                    </tr>
                                ) : paginatedStructures.map((item, index) => {
                                    const category = getCategory(item);

                                    return (
                                        <tr
                                            key={item.id}
                                            className="text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-4 py-3 text-sm">
                                                {(currentPage - 1) * perPage + index + 1}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div className="mr-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 font-semibold text-purple-700 dark:bg-purple-700 dark:text-purple-100">
                                                        {(category?.name ?? "F")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <span className="font-semibold">
                                                        {category?.name ?? "—"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                {getAcademicSession(item)}
                                            </td>

                                            <td className="px-4 py-3 text-sm">
                                                {item.semester?.name ?? "—"}
                                            </td>

                                            <td className="px-4 py-3 text-sm font-semibold">
                                                ৳ {Number(item.amount).toLocaleString("en-BD", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        to={`/fee-structures/${item.id}`}
                                                        title="View fee structure"
                                                        aria-label={`View fee structure ${item.id}`}
                                                        className="rounded-lg border border-purple-200 bg-white p-2 text-purple-600 transition hover:border-purple-400 hover:bg-purple-100 dark:border-gray-600 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
                                                    >
                                                        <svg
                                                            className="h-4 w-4"
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
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </Link>

                                                    <Link
                                                        to={`/fee-structures/${item.id}/edit`}
                                                        title="Edit fee structure"
                                                        aria-label={`Edit fee structure ${item.id}`}
                                                        className="rounded-lg border border-blue-200 bg-white p-2 text-blue-600 transition hover:border-blue-400 hover:bg-blue-100 dark:border-gray-600 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                                                    >
                                                        <svg
                                                            className="h-4 w-4"
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
                                                        title="Delete fee structure"
                                                        aria-label={`Delete fee structure ${item.id}`}
                                                        disabled={deletingId === item.id}
                                                        onClick={() => handleDelete(item)}
                                                        className="rounded-lg border border-red-200 bg-white p-2 text-red-600 transition hover:border-red-400 hover:bg-red-100 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                                                    >
                                                        {deletingId === item.id ? (
                                                            <span className="text-xs">...</span>
                                                        ) : (
                                                            <svg
                                                                className="h-4 w-4"
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
                                    );
                                })}

                                {!loading && paginatedStructures.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            {error
                                                ? "Could not load fee structures."
                                                : "No fee structures found. Try another search or add a fee structure."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="grid border-t bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:grid-cols-2">
                        <span className="flex items-center">
                            Showing{" "}
                            {filteredStructures.length === 0
                                ? 0
                                : (currentPage - 1) * perPage + 1}
                            {" - "}
                            {Math.min(
                                currentPage * perPage,
                                filteredStructures.length
                            )}
                            {" of "}
                            {filteredStructures.length} fee structures
                        </span>

                        <span className="mt-2 flex sm:mt-auto sm:justify-end">
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
                                            className="rounded-md px-3 py-1 hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-gray-700"
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
                                                className={`rounded-md px-3 py-1 transition-colors ${currentPage === page
                                                    ? "border border-purple-600 bg-purple-600 text-white"
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
                                            disabled={currentPage === totalPages || loading}
                                            onClick={() =>
                                                setCurrentPage((page) =>
                                                    Math.min(totalPages, page + 1)
                                                )
                                            }
                                            className="rounded-md px-3 py-1 hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-gray-700"
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
                itemName={
                    getCategory(selectedStructure ?? {
                        id: 0,
                        semester_id: 0,
                        fee_category_id: 0,
                        amount: 0,
                    })?.name ?? "this fee structure"
                }
                isDeleting={deletingId !== null}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
        </main>
    );
}

