
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";


import { api } from "../../../api";
import type { FeePayment } from "../../../interfaces/FeePayment";
import AlertMessage from "../../components/AlertMsg";
import PageHeading from "../../components/PageHeading";
import DeleteModal from "../../components/DeleteModal";

export default function ManageFeePayment() {
    const [feePayments, setFeePayments] = useState<FeePayment[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [selectedPayment, setSelectedPayment] =
        useState<FeePayment | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const perPage = 10;

    const fetchFeePayments = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("fee-payments");
            const payload = response.data;

            const payments: FeePayment[] = Array.isArray(payload)
                ? payload
                : Array.isArray(payload.fee_payments)
                    ? payload.fee_payments
                    : Array.isArray(payload.fee_payments?.data)
                        ? payload.fee_payments.data
                        : [];

            setFeePayments(payments);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to load fee payments. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchFeePayments();
    }, []);

    useEffect(() => {
        const message = location.state?.successMessage;

        if (message) {
            setSuccessMessage(message);
            navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
    }, [location, navigate]);

    const filteredPayments = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return feePayments.filter((payment) => {
            return (
                payment.receipt_no?.toLowerCase().includes(keyword) ||
                payment.student?.name?.toLowerCase().includes(keyword) ||
                payment.student?.student_id?.toLowerCase().includes(keyword) ||
                payment.academic_session?.name?.toLowerCase().includes(keyword) ||
                payment.semester?.name?.toLowerCase().includes(keyword) ||
                payment.payment_date?.toLowerCase().includes(keyword) ||
                String(payment.total_amount).includes(keyword) ||
                String(payment.payment_amount).includes(keyword) ||
                String(payment.due_amount).includes(keyword)
            );
        });
    }, [feePayments, search]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPayments.length / perPage)
    );

    const startIndex = (currentPage - 1) * perPage;

    const paginatedPayments = filteredPayments.slice(
        startIndex,
        startIndex + perPage
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        setSearch("");
        setCurrentPage(1);
        setSuccessMessage("");
        void fetchFeePayments();
    };

    const handleDelete = (payment: FeePayment) => {
        setSelectedPayment(payment);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        if (deletingId !== null) return;

        setIsDeleteModalOpen(false);
        setSelectedPayment(null);
    };

    const confirmDelete = async () => {
        if (!selectedPayment) return;

        const paymentId = selectedPayment.id;

        setDeletingId(paymentId);
        setError("");

        try {
            const response = await api.delete(`fee-payments/${paymentId}`);

            setFeePayments((previous) =>
                previous.filter((payment) => payment.id !== paymentId)
            );

            setSuccessMessage(
                response.data?.message || "Fee payment deleted successfully."
            );

            setIsDeleteModalOpen(false);
            setSelectedPayment(null);

            const remainingCount = filteredPayments.length - 1;
            const lastPage = Math.max(
                1,
                Math.ceil(remainingCount / perPage)
            );

            if (currentPage > lastPage) {
                setCurrentPage(lastPage);
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to delete fee payment. Please try again."
            );
            setIsDeleteModalOpen(false);
        } finally {
            setDeletingId(null);
        }
    };

    const formatAmount = (amount: number) =>
        Number(amount || 0).toLocaleString("en-BD", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <main className="w-full min-w-0">
            <div className="grid w-full min-w-0 px-6">
                <PageHeading
                    title="Fee Payments"
                    subtitle="Manage student fee payments and receipts."
                    buttonText="Add Payment"
                    buttonLink="/fee-payments/create"
                    icon="plus"
                />

                {successMessage && (
                    <div className="mb-4">
                        <AlertMessage
                            type="success"
                            message={successMessage}
                            onClose={() => setSuccessMessage("")}
                        />
                    </div>
                )}
                <div className="w-full min-w-0 overflow-hidden rounded-lg bg-white shadow-xs dark:bg-gray-800">
                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:max-w-md">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16 16 4 4"
                                />
                            </svg>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search receipt, student, session..."
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleRefresh}
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
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
                                    d="M20 7v5h-5M4 17v-5h5"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.5 9A7 7 0 0118 6l2 6M4 12l2 6a7 7 0 0012.5-1"
                                />
                            </svg>
                            Refresh
                        </button>
                    </div>

                    {error && (
                        <div className="mx-4 mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                            {error}
                        </div>
                    )}

                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-nowrap text-left text-sm">
                            <thead className="border-y border-gray-200 bg-gray-50 text-xs uppercase text-gray-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Receipt No</th>
                                    <th className="px-4 py-3">Student</th>
                                    <th className="px-4 py-3">Academic Session</th>
                                    <th className="px-4 py-3">Semester</th>
                                    <th className="px-4 py-3">Payment Date</th>
                                    <th className="px-4 py-3 text-right">Total</th>
                                    <th className="px-4 py-3 text-right">Paid</th>
                                    <th className="px-4 py-3 text-right">Due</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            Loading fee payments...
                                        </td>
                                    </tr>
                                ) : paginatedPayments.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            {search
                                                ? "No fee payments match your search."
                                                : "No fee payments found."}
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedPayments.map((payment, index) => (
                                        <tr
                                            key={payment.id}
                                            className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        >
                                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                                {startIndex + index + 1}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2 font-medium text-gray-800 dark:text-gray-100">
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
                                                            d="M6 2h9l5 5v15l-3-2-3 2-3-2-3 2-3-2-3 2V2z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 11h6M9 15h6M15 2v5h5"
                                                        />
                                                    </svg>
                                                    {payment.receipt_no || "—"}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {payment.student?.name || "—"}
                                                {payment.student?.student_id && (
                                                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                        ID: {payment.student.student_id}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {payment.academic_session?.name || "—"}
                                            </td>

                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {payment.semester?.name || "—"}
                                            </td>

                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {payment.payment_date
                                                    ? payment.payment_date.slice(0, 10)
                                                    : "—"}
                                            </td>

                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                                                ৳{formatAmount(payment.total_amount)}
                                            </td>

                                            <td className="px-4 py-3 text-right font-medium text-green-600 dark:text-green-400">
                                                ৳{formatAmount(payment.payment_amount)}
                                            </td>

                                            <td className="px-4 py-3 text-right font-medium text-red-600 dark:text-red-400">
                                                ৳{formatAmount(payment.due_amount)}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        to={`/fee-payments/${payment.id}`}
                                                        title="View payment"
                                                        className="rounded-md border border-blue-200 p-2 text-blue-600 transition hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30"
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
                                                                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                                                            />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </svg>
                                                    </Link>

                                                    <Link
                                                        to={`/fee-payments/${payment.id}/edit`}
                                                        title="Edit payment"
                                                        className="rounded-md border border-amber-200 p-2 text-amber-600 transition hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/30"
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
                                                                d="M12 20h9"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                                                            />
                                                        </svg>
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        title="Delete payment"
                                                        onClick={() => handleDelete(payment)}
                                                        disabled={deletingId !== null}
                                                        className="rounded-md border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
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
                                                                d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showing{" "}
                            {filteredPayments.length === 0 ? 0 : startIndex + 1}
                            {" "}to{" "}
                            {Math.min(
                                startIndex + perPage,
                                filteredPayments.length
                            )}{" "}
                            of {filteredPayments.length} payments
                        </p>

                        <div className="flex flex-wrap items-center gap-1">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) => Math.max(1, page - 1))
                                }
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Previous
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page)}
                                    className={`rounded-md border px-3 py-2 text-sm transition ${currentPage === page
                                        ? "border-purple-600 bg-purple-600 text-white"
                                        : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(totalPages, page + 1)
                                    )
                                }
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                itemName={
                    selectedPayment
                        ? selectedPayment.receipt_no || "this fee payment"
                        : "this fee payment"
                }
                isDeleting={deletingId !== null}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
        </main>
    );
}