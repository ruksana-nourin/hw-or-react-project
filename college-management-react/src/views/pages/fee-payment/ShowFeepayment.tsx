
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../../api";
import type { FeePayment } from "../../../interfaces/FeePayment";
import PageHeading from "../../components/PageHeading";

function ShowFeePayment() {
    const { id } = useParams();

    const [payment, setPayment] = useState<FeePayment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`fee-payments/${id}`);
                const result = response.data;

                const paymentData =
                    result.feePayment ??
                    result.fee_payment ??
                    result.payment ??
                    result.data ??
                    result;

                setPayment(paymentData);
            } catch (err) {
                console.error("Failed to load fee payment:", err);
                setError("Unable to load this payment. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPayment();
        } else {
            setError("Payment ID is missing.");
            setLoading(false);
        }
    }, [id]);

    const formatAmount = (amount?: number | string | null) => {
        const value = Number(amount ?? 0);

        return value.toLocaleString("en-BD", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatDate = (date?: string) => {
        if (!date) return "—";

        const dateOnly = date.slice(0, 10);
        const parsedDate = new Date(`${dateOnly}T00:00:00`);

        if (Number.isNaN(parsedDate.getTime())) return dateOnly;

        return parsedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const previousPaid = payment
        ? Number(payment.total_amount ?? 0) -
        Number(payment.payment_amount ?? 0) -
        Number(payment.due_amount ?? 0)
        : 0;

    if (loading) {
        return (
            <main className="dashboard-content">
                <div className="container-fluid py-10 text-center text-gray-500 dark:text-gray-400">
                    Loading payment details...
                </div>
            </main>
        );
    }

    if (error || !payment) {
        return (
            <main className="dashboard-content">
                <div className="container-fluid">
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                        {error || "Payment not found."}
                    </div>

                    <Link
                        to="/fee-payments"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                        <i className="bi bi-arrow-left" />
                        Back to Fee Payments
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <style>{`
                /* =====================================
                   SCREEN LAYOUT
                   Colors are handled by Tailwind
                ===================================== */

                .payment-details-card {
                    border-radius: 0.75rem;
                    padding: 28px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                }

                .payment-details-section {
                    margin-top: 28px;
                }

                .payment-details-heading {
                    margin-bottom: 16px;
                    font-size: 17px;
                    font-weight: 700;
                }

                .payment-info-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 16px;
                }

                .payment-info-item {
                    min-width: 0;
                    padding: 15px 17px;
                    border-radius: 0.5rem;
                    transition: border-color 0.2s ease,
                                background-color 0.2s ease;
                }

                .payment-info-item:hover {
                    border-color: #a78bfa;
                }

                .payment-info-item .label {
                    display: block;
                    margin-bottom: 7px;
                    font-size: 13px;
                }

                .payment-info-item .value {
                    display: block;
                    font-size: 15px;
                    font-weight: 600;
                    overflow-wrap: anywhere;
                }

                .payment-summary-grid {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 14px;
                }

                .payment-summary-item {
                    min-width: 0;
                    padding: 18px;
                    border: 1px solid;
                    border-radius: 0.5rem;
                    transition: border-color 0.2s ease,
                                background-color 0.2s ease;
                }

                .payment-summary-item:hover {
                    border-color: #a78bfa;
                }

                .payment-summary-item .label {
                    display: block;
                    margin-bottom: 10px;
                    font-size: 12px;
                }

                .payment-summary-item .value {
                    display: block;
                    font-size: 18px;
                    font-weight: 700;
                    overflow-wrap: anywhere;
                }

                .payment-summary-item.total {
                    border-top: 3px solid #64748b;
                }

                .payment-summary-item.previous {
                    border-top: 3px solid #2563eb;
                }

                .payment-summary-item.paid {
                    border-top: 3px solid #16a34a;
                }

                .payment-summary-item.due {
                    border-top: 3px solid #dc2626;
                }

                .payment-action-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 11px 18px;
                    min-height: 42px;
                    border-radius: 0.5rem;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: background-color 0.2s ease;
                    cursor: pointer;
                }

                .payment-back-button {
                    border: 1px solid #d1d5db;
                    background: #f9fafb;
                    color: #374151;
                }

                .payment-back-button:hover {
                    background: #f3f4f6;
                }

                .payment-print-button {
                    border: 1px solid #f3f5f8;
                    background: #a20505;
                    color: #fff;
                }

                .payment-print-button:hover {
                    background: #c31104;
                }

                /* =====================================
                   PRINT RECEIPT
                ===================================== */

                .print-only {
                    display: none;
                }

                .receipt-paper {
                    box-sizing: border-box;
                    width: 100%;
                    color: #222;
                    background: #fff;
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 12px;
                    line-height: 1.45;
                    border: none;
                }

                .college-header {
                    text-align: center;
                    padding-bottom: 12px;
                    margin-bottom: 16px;
                    border-bottom: 2px solid #222;
                }

                .college-header h1 {
                    margin: 0 0 5px;
                    font-size: 24px;
                    font-weight: 700;
                }

                .college-header p {
                    margin: 2px 0;
                    font-size: 11px;
                }

                .receipt-title {
                    text-align: center;
                    margin-bottom: 18px;
                }

                .receipt-title h2 {
                    display: inline-block;
                    margin: 0;
                    padding: 6px 18px;
                    border: 1px solid #222;
                    font-size: 16px;
                    font-weight: 700;
                }

                .receipt-info {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
                    gap: 12px 24px;
                    margin-bottom: 18px;
                }

                .receipt-info p {
                    margin: 0 0 7px;
                    overflow-wrap: anywhere;
                }

                .receipt-info strong {
                    display: inline-block;
                    min-width: 105px;
                }

                .section-title {
                    margin: 12px 0 8px;
                    font-size: 13px;
                    font-weight: 700;
                }

                .receipt-table {
                    width: 100%;
                    border-collapse: collapse;
                    table-layout: fixed;
                    margin-top: 8px;
                }

                .receipt-table th,
                .receipt-table td {
                    border: 1px solid #777;
                    padding: 7px;
                    font-size: 11px;
                    overflow-wrap: anywhere;
                    vertical-align: middle;
                }

                .receipt-table th {
                    background: #f1f1f1;
                    font-weight: 700;
                    text-align: left;
                }

                .receipt-table .amount {
                    text-align: right;
                    white-space: nowrap;
                }

                .fee-details-table th:nth-child(1),
                .fee-details-table td:nth-child(1) {
                    width: 8%;
                    text-align: center;
                }

                .fee-details-table th:nth-child(2),
                .fee-details-table td:nth-child(2) {
                    width: 42%;
                }

                .fee-details-table th:nth-child(3),
                .fee-details-table td:nth-child(3),
                .fee-details-table th:nth-child(4),
                .fee-details-table td:nth-child(4) {
                    width: 25%;
                }

                .fee-details-table tfoot th {
                    background: #f1f1f1;
                }

                .summary-wrap {
                    width: 100%;
                    max-width: 100%;
                    margin: 16px 0 0 auto;
                        box-sizing: border-box;

                }

                .summary-table th:first-child,
                .summary-table td:first-child {
                    width: 65%;
                    text-align: left;
                }

                .summary-table th:last-child,
                .summary-table td:last-child {
                    width: 35%;
                }

                .summary-table .amount {
                    text-align: right;
                    white-space: nowrap;
                }

                .summary-table tbody tr:last-child td {
                    font-weight: 700;
                }

                .receipt-footer {
                    display: flex;
                    justify-content: space-between;
                    gap: 35px;
                    margin-top: 55px;
                }

                .receipt-footer div {
                    width: 190px;
                    padding-top: 7px;
                    border-top: 1px solid #222;
                    text-align: center;
                    font-size: 11px;
                }

                .receipt-note {
                    margin-top: 28px;
                    text-align: center;
                    font-size: 10px;
                    color: #555;
                }

                /* =====================================
                   RESPONSIVE
                ===================================== */

                @media screen and (max-width: 900px) {
                    .payment-summary-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }

                @media screen and (max-width: 640px) {
                    .payment-details-card {
                        padding: 16px;
                    }

                    .payment-info-grid,
                    .payment-summary-grid {
                        grid-template-columns: 1fr;
                    }

                    .payment-action-button {
                        padding: 10px 13px;
                        font-size: 13px;
                    }

                    .receipt-footer {
                        gap: 20px;
                    }
                }

                /* =====================================
                   PRINT: RECEIPT ONLY
                ===================================== */

                @page {
                    size: A4 portrait;
                    margin: 10mm;
                }

                @media print {
                    html,
                    body {
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: #fff !important;
                        print-color-adjust: exact !important;
                        -webkit-print-color-adjust: exact !important;
                    }

                    body * {
                        visibility: hidden !important;
                    }

                    .print-only,
                    .print-only * {
                        visibility: visible !important;
                    }

                    .print-only {
                        display: block !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: #fff !important;
                    }

                    .no-print {
                        display: none !important;
                    }

                    #receipt-print {
                        position: static !important;
                        width: 100% !important;
                        max-width: none !important;
                        min-height: 0 !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        border: none !important;
                        border-radius: 0 !important;
                        box-shadow: none !important;
                        background: #fff !important;
                        color: #000 !important;
                        font-size: 11px !important;
                    }

                    #receipt-print .college-header h1 {
                        font-size: 22px !important;
                    }

                    #receipt-print .receipt-info {
                        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
                        gap: 8px 18px !important;
                    }

                    #receipt-print .receipt-table {
                        width: 100% !important;
                        table-layout: fixed !important;
                        border-collapse: collapse !important;
                    }

                    #receipt-print .receipt-table th,
                    #receipt-print .receipt-table td {
                        border: 1px solid #555 !important;
                        padding: 6px 5px !important;
                        font-size: 10px !important;
                        color: #000 !important;
                        background: #fff !important;
                        overflow-wrap: break-word !important;
                    }

                    #receipt-print .fee-details-table th:nth-child(1),
                    #receipt-print .fee-details-table td:nth-child(1) {
                        width: 8% !important;
                    }

                    #receipt-print .fee-details-table th:nth-child(2),
                    #receipt-print .fee-details-table td:nth-child(2) {
                        width: 42% !important;
                    }

                    #receipt-print .fee-details-table th:nth-child(3),
                    #receipt-print .fee-details-table td:nth-child(3),
                    #receipt-print .fee-details-table th:nth-child(4),
                    #receipt-print .fee-details-table td:nth-child(4) {
                        width: 25% !important;
                    }

                    #receipt-print .summary-wrap {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        margin: 12px 0 0 0 !important;
                        padding: 0 !important;
                        box-sizing: border-box !important;
                    }

                    #receipt-print .fee-details-table,
                    #receipt-print .summary-table {
                        display: table !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        table-layout: fixed !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        box-sizing: border-box !important;
                    }

                    #receipt-print .summary-table th:first-child,
                    #receipt-print .summary-table td:first-child {
                        width: 65% !important;
                    }

                    #receipt-print .summary-table th:last-child,
                    #receipt-print .summary-table td:last-child {
                        width: 35% !important;
                    }

                    #receipt-print .summary-table .amount {
                        white-space: nowrap !important;
                        text-align: right !important;
                    }

                    #receipt-print .receipt-footer {
                        margin-top: 38px !important;
                        break-inside: avoid !important;
                        page-break-inside: avoid !important;
                    }

                    #receipt-print .receipt-note {
                        margin-top: 20px !important;
                    }

                    #receipt-print .receipt-muted {
                        color: #555 !important;
                    }

                    #receipt-print .receipt-border {
                        border-color: #999 !important;
                    }

                    #receipt-print .receipt-paid {
                        color: #166534 !important;
                    }

                    #receipt-print .receipt-due {
                        color: #991b1b !important;
                    }

                    #receipt-print .college-header,
                    #receipt-print .receipt-title,
                    #receipt-print .section-title,
                    #receipt-print .receipt-table tr {
                        break-inside: avoid !important;
                        page-break-inside: avoid !important;
                    }

                   /* Remove the unwanted outer border */
@media print {
    #receipt-print,
    #receipt-print.receipt-paper,
    .print-only,
    .print-only > div {
        border: 0 !important;
        outline: 0 !important;
        box-shadow: none !important;
        background-image: none !important;
    }

    #receipt-print::before,
    #receipt-print::after,
    .print-only::before,
    .print-only::after {
        content: none !important;
        display: none !important;
        border: 0 !important;
        box-shadow: none !important;
    }

    /* Keep table borders thin */
    #receipt-print .receipt-table {
        border: 0 !important;
        border-collapse: collapse !important;
    }

    #receipt-print .receipt-table th,
    #receipt-print .receipt-table td {
        border: 1px solid #aaa !important;
    }
}
                        
                        
                        
                }
            `}</style>

            <main className="w-full min-w-0">

                <div className="grid w-full min-w-0 px-6">
                    {/* SCREEN: PAYMENT DETAILS */}

                    <div className="no-print">
                        <PageHeading
                            title="Payment Details"
                            subtitle="View fee payment information and receipt"
                            buttonText="Back to Fee Payments"
                            buttonColor="blue"
                            buttonLink="/fee-payments"
                            icon="back"
                        />

                        <div className="payment-details-card mt-6 border border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5 dark:border-gray-700">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                        Payment Information
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Receipt No:{" "}
                                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                                            {payment.receipt_no ?? "N/A"}
                                        </span>
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handlePrint}
                                    className="payment-action-button payment-print-button "
                                >
                                    <i className="bi bi-printer" />
                                    Print Receipt
                                </button>
                            </div>

                            {/* Student Information */}

                            <div className="payment-details-section">
                                <h3 className="payment-details-heading text-gray-800 dark:text-white">
                                    <i className="bi bi-person-vcard mr-2 text-blue-600 dark:text-blue-400" />
                                    Student Information
                                </h3>

                                <div className="payment-info-grid">
                                    <div className="payment-info-item border border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Student ID
                                        </span>
                                        <span className="value text-gray-800 dark:text-gray-100">
                                            {payment.student?.student_id ??
                                                payment.student_id ??
                                                "N/A"}
                                        </span>
                                    </div>

                                    <div className="payment-info-item border border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Student Name
                                        </span>
                                        <span className="value text-gray-800 dark:text-gray-100">
                                            {payment.student?.name ?? "N/A"}
                                        </span>
                                    </div>

                                    <div className="payment-info-item border border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Department
                                        </span>
                                        <span className="value text-gray-800 dark:text-gray-100">
                                            {payment.student?.department?.name ?? "N/A"}
                                        </span>
                                    </div>

                                    <div className="payment-info-item border border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Course
                                        </span>
                                        <span className="value text-gray-800 dark:text-gray-100">
                                            {payment.student?.course?.name ?? "N/A"}
                                        </span>
                                    </div>

                                    <div className="payment-info-item border border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Academic Session
                                        </span>
                                        <span className="value text-gray-800 dark:text-gray-100">
                                            {(payment.academicSession ??
                                                payment.academic_session)?.name ?? "N/A"}
                                        </span>
                                    </div>

                                    <div className="payment-info-item border border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Semester
                                        </span>
                                        <span className="value text-gray-800 dark:text-gray-100">
                                            {payment.semester?.name ?? "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}

                            <div className="payment-details-section">
                                <h3 className="payment-details-heading text-gray-800 dark:text-white">
                                    <i className="bi bi-calendar-check mr-2 text-blue-600 dark:text-blue-400" />
                                    Payment Information
                                </h3>

                                <div className="payment-info-grid">
                                    <div className="payment-info-item border border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Receipt Number
                                        </span>
                                        <span className="value text-gray-800 dark:text-gray-100">
                                            {payment.receipt_no ?? "N/A"}
                                        </span>
                                    </div>

                                    <div className="payment-info-item border border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Payment Date
                                        </span>
                                        <span className="value text-gray-800 dark:text-gray-100">
                                            {formatDate(payment.payment_date)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Summary */}

                            <div className="payment-details-section">
                                <h3 className="payment-details-heading text-gray-800 dark:text-white">
                                    <i className="bi bi-wallet2 mr-2 text-blue-600 dark:text-blue-400" />
                                    Payment Summary
                                </h3>

                                <div className="payment-summary-grid">
                                    <div className="payment-summary-item total border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Total Semester Fee
                                        </span>
                                        <span className="value text-gray-800 dark:text-gray-100">
                                            ৳{formatAmount(payment.total_amount)}
                                        </span>
                                    </div>

                                    <div className="payment-summary-item previous border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Previous Paid
                                        </span>
                                        <span className="value text-blue-600 dark:text-blue-400">
                                            ৳{formatAmount(previousPaid)}
                                        </span>
                                    </div>

                                    <div className="payment-summary-item paid border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Current Payment
                                        </span>
                                        <span className="value text-green-600 dark:text-green-400">
                                            ৳{formatAmount(payment.payment_amount)}
                                        </span>
                                    </div>

                                    <div className="payment-summary-item due border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/40">
                                        <span className="label text-gray-500 dark:text-gray-400">
                                            Remaining Due
                                        </span>
                                        <span className="value text-red-600 dark:text-red-400">
                                            ৳{formatAmount(payment.due_amount)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Fee Payment Details */}

                            <div className="payment-details-section">
                                <h3 className="payment-details-heading text-gray-800 dark:text-white">
                                    <i className="bi bi-receipt mr-2 text-blue-600 dark:text-blue-400" />
                                    Fee Payment Details
                                </h3>

                                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40">
                                                <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                                                    #
                                                </th>
                                                <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                                                    Fee Category
                                                </th>
                                                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-300">
                                                    Fee Amount
                                                </th>
                                                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-300">
                                                    Paid Amount
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {payment.details?.length ? (
                                                payment.details.map((detail, index) => (
                                                    <tr
                                                        key={detail.id}
                                                        className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900/40"
                                                    >
                                                        <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                                                            {index + 1}
                                                        </td>

                                                        <td className="px-4 py-4 font-medium text-gray-700 dark:text-gray-200">
                                                            {detail.feeCategory?.name ??
                                                                detail.fee_category?.name ??
                                                                "N/A"}
                                                        </td>

                                                        <td className="px-4 py-4 text-right text-gray-700 dark:text-gray-300">
                                                            ৳{formatAmount(detail.amount)}
                                                        </td>

                                                        <td className="px-4 py-4 text-right font-semibold text-green-600 dark:text-green-400">
                                                            ৳{formatAmount(detail.amount)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={4}
                                                        className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                                                    >
                                                        Fee category details are not available.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>

                                        <tfoot>
                                            <tr className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40">
                                                <td
                                                    colSpan={3}
                                                    className="px-4 py-4 text-right font-bold text-gray-700 dark:text-gray-200"
                                                >
                                                    Total Paid
                                                </td>

                                                <td className="px-4 py-4 text-right font-bold text-green-600 dark:text-green-400">
                                                    ৳{formatAmount(payment.payment_amount)}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Action Buttons */}

                            <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
                                <Link
                                    to="/fee-payments"
                                    className="payment-action-button payment-back-button border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    <i className="bi bi-arrow-left" />
                                    Back to Fee Payments
                                </Link>

                                <button
                                    type="button"
                                    onClick={handlePrint}
                                    className="payment-action-button payment-print-button"
                                >
                                    <i className="bi bi-printer" />
                                    Print Receipt
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* PRINT ONLY: OFFICIAL FEE RECEIPT */}

                    <div className="print-only">
                        <div
                            id="receipt-print"
                            className="receipt-paper mx-auto max-w-4xl bg-white p-8 text-black"
                        >
                            <div className="college-header">
                                <h1>Creative College</h1>
                                <p>Address: 123 Main Street, Mirpur, Dhaka</p>
                                <p>Phone: +88 123 456 789</p>
                            </div>

                            <div className="receipt-title">
                                <h2>FEE PAYMENT RECEIPT</h2>
                            </div>

                            <div className="receipt-info">
                                <div>
                                    <p>
                                        <strong>Receipt No:</strong>{" "}
                                        {payment.receipt_no ?? "N/A"}
                                    </p>
                                    <p>
                                        <strong>Student ID:</strong>{" "}
                                        {payment.student?.student_id ??
                                            payment.student_id ??
                                            "N/A"}
                                    </p>
                                    <p>
                                        <strong>Student Name:</strong>{" "}
                                        {payment.student?.name ?? "N/A"}
                                    </p>
                                    <p>
                                        <strong>Session:</strong>{" "}
                                        {(payment.academicSession ??
                                            payment.academic_session)?.name ?? "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        <strong>Payment Date:</strong>{" "}
                                        {formatDate(payment.payment_date)}
                                    </p>
                                    <p>
                                        <strong>Semester:</strong>{" "}
                                        {payment.semester?.name ?? "N/A"}
                                    </p>
                                    <p>
                                        <strong>Department:</strong>{" "}
                                        {payment.student?.department?.name ?? "N/A"}
                                    </p>
                                    <p>
                                        <strong>Course:</strong>{" "}
                                        {payment.student?.course?.name ?? "N/A"}
                                    </p>
                                </div>
                            </div>

                            <h3 className="section-title">Fee Payment Details</h3>

                            <table className="receipt-table fee-details-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fee Category</th>
                                        <th className="amount">Fee Amount</th>
                                        <th className="amount">Paid Amount</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {payment.details?.length ? (
                                        payment.details.map((detail, index) => (
                                            <tr key={detail.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {detail.feeCategory?.name ??
                                                        detail.fee_category?.name ??
                                                        "N/A"}
                                                </td>
                                                <td className="amount">
                                                    ৳{formatAmount(detail.amount)}
                                                </td>
                                                <td className="amount">
                                                    ৳{formatAmount(detail.amount)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: "center" }}>
                                                Fee category details are not available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <th colSpan={3} className="amount">
                                            Total Paid
                                        </th>
                                        <th className="amount">
                                            ৳{formatAmount(payment.payment_amount)}
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="summary-wrap">
                                <table className="receipt-table summary-table">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th className="amount">Amount</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>Total Semester Fee</td>
                                            <td className="amount">
                                                ৳{formatAmount(payment.total_amount)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Previous Paid</td>
                                            <td className="amount">
                                                ৳{formatAmount(previousPaid)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Current Payment</td>
                                            <td className="amount">
                                                ৳{formatAmount(payment.payment_amount)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Remaining Due</td>
                                            <td className="amount">
                                                ৳{formatAmount(payment.due_amount)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="receipt-footer">
                                <div>Student / Guardian</div>
                                <div>Authorized Signature</div>
                            </div>

                            <p className="receipt-note">
                                This is a computer-generated receipt.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ShowFeePayment;