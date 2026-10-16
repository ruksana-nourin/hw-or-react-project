
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../../api";
import type {
    FeePaymentStudent,
    FeePaymentAcademicSession,
    FeePaymentSemester,
    FeePaymentErrors,
} from "../../../interfaces/FeePayment";
import PageHeading from "../../components/PageHeading";

interface SemesterOption extends FeePaymentSemester {
    academic_session_id: number;
}

interface FeeStructure {
    id: number;
    fee_category_id: number;
    amount: number | string;
    fee_category: {
        id: number;
        name: string;
    };
}

interface PreviousPaymentDetail {
    fee_category_id: number;
    previous_paid: number | string;
}

interface PaymentRow extends FeeStructure {
    previousPaid: number;
    payment: number;
}

const money = (value: number) =>
    `৳${value.toLocaleString("en-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

const inputClass =
    "mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900 dark:disabled:bg-gray-800";

const labelClass =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300";

const toCents = (value: number) =>
    Math.round((value + Number.EPSILON) * 100);

const fromCents = (value: number) => value / 100;

export default function CreateFeePayment() {
    const navigate = useNavigate();

    const [students, setStudents] = useState<FeePaymentStudent[]>([]);
    const [sessions, setSessions] = useState<FeePaymentAcademicSession[]>([]);
    const [semesters, setSemesters] = useState<SemesterOption[]>([]);

    const [studentId, setStudentId] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [semesterId, setSemesterId] = useState("");

    const [paymentDate, setPaymentDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );

    // Raw input value: keeps typing and decimal editing responsive.
    const [paymentAmount, setPaymentAmount] = useState("");

    // Raw input values for each category's Pay Now field.
    const [categoryPaymentInputs, setCategoryPaymentInputs] =
        useState<Record<number, string>>({});

    const [feeStructures, setFeeStructures] = useState<PaymentRow[]>([]);
    const [previousPaid, setPreviousPaid] = useState(0);

    const [loadingForm, setLoadingForm] = useState(true);
    const [loadingFees, setLoadingFees] = useState(false);
    const [loadingPrevious, setLoadingPrevious] = useState(false);
    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState<FeePaymentErrors>({});
    const [errorMessage, setErrorMessage] = useState("");

    // Load students, sessions and semesters.
    useEffect(() => {
        let cancelled = false;

        const loadFormData = async () => {
            try {
                const response = await api.get("fee-payments/form-data");

                if (cancelled) return;

                const data = response.data;

                setStudents(data.students ?? []);
                setSessions(data.academic_sessions ?? []);
                setSemesters(data.semesters ?? []);
            } catch {
                if (!cancelled) {
                    setErrorMessage("Failed to load fee payment form data.");
                }
            } finally {
                if (!cancelled) {
                    setLoadingForm(false);
                }
            }
        };

        loadFormData();

        return () => {
            cancelled = true;
        };
    }, []);

    const selectedStudent = students.find(
        (student) => student.id === Number(studentId)
    );

    const filteredSemesters = useMemo(
        () =>
            semesters.filter(
                (semester) =>
                    semester.academic_session_id === Number(sessionId)
            ),
        [semesters, sessionId]
    );

    const totalAmount = feeStructures.reduce(
        (sum, fee) => sum + Number(fee.amount || 0),
        0
    );

    const detailPaymentTotal = feeStructures.reduce(
        (sum, fee) => sum + fee.payment,
        0
    );

    const dueAmount = Math.max(
        0,
        totalAmount - previousPaid - detailPaymentTotal
    );

    // Reset payment fields when the student changes.
    const updateStudent = (value: string) => {
        setStudentId(value);

        const student = students.find(
            (item) => item.id === Number(value)
        );

        const newSessionId = student
            ? String(
                  (
                      student as FeePaymentStudent & {
                          academic_session_id?: number;
                      }
                  ).academic_session_id ?? ""
              )
            : "";

        setSessionId(newSessionId);
        setSemesterId("");
        setFeeStructures([]);
        setPreviousPaid(0);
        setPaymentAmount("");
        setCategoryPaymentInputs({});
        setErrors({});
        setErrorMessage("");
    };

    // Reset payment fields when the session changes.
    const updateSession = (value: string) => {
        setSessionId(value);
        setSemesterId("");
        setFeeStructures([]);
        setPreviousPaid(0);
        setPaymentAmount("");
        setCategoryPaymentInputs({});
        setErrors({});
        setErrorMessage("");
    };

    // Load fee structures and previous payment details.
    useEffect(() => {
        if (!studentId || !sessionId || !semesterId) {
            setFeeStructures([]);
            setPreviousPaid(0);
            setPaymentAmount("");
            setCategoryPaymentInputs({});
            setLoadingFees(false);
            setLoadingPrevious(false);
            return;
        }

        let cancelled = false;

        const loadPaymentData = async () => {
            setLoadingFees(true);
            setLoadingPrevious(true);
            setErrorMessage("");
            setFeeStructures([]);
            setPreviousPaid(0);
            setPaymentAmount("");
            setCategoryPaymentInputs({});

            try {
                const [
                    structuresResponse,
                    totalResponse,
                    detailsResponse,
                ] = await Promise.all([
                    api.get(`fee-payments/fee-structures/${semesterId}`),
                    api.get(
                        `fee-payments/previous-payment/${studentId}/${sessionId}/${semesterId}`
                    ),
                    api.get(
                        `fee-payments/previous-payment-details/${studentId}/${sessionId}/${semesterId}`
                    ),
                ]);

                if (cancelled) return;

                const structures: FeeStructure[] =
                    structuresResponse.data.fee_structures ?? [];

                const previousDetails: PreviousPaymentDetail[] =
                    detailsResponse.data.previous_payments ?? [];

                const totalPreviousPaid = Number(
                    totalResponse.data.previous_paid ?? 0
                );

                const loadedFees: PaymentRow[] = structures.map((fee) => {
                    const detail = previousDetails.find(
                        (item) =>
                            Number(item.fee_category_id) ===
                            Number(fee.fee_category_id)
                    );

                    const feeAmount = Number(fee.amount) || 0;

                    return {
                        ...fee,
                        previousPaid: Math.min(
                            Math.max(
                                0,
                                Number(detail?.previous_paid ?? 0)
                            ),
                            feeAmount
                        ),
                        payment: 0,
                    };
                });

                setPreviousPaid(totalPreviousPaid);
                setFeeStructures(loadedFees);
                setPaymentAmount("");
                setCategoryPaymentInputs({});
            } catch (error: any) {
                if (!cancelled) {
                    setErrorMessage(
                        error.response?.data?.message ??
                            "Failed to load fee and previous payment details."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoadingFees(false);
                    setLoadingPrevious(false);
                }
            }
        };

        loadPaymentData();

        return () => {
            cancelled = true;
        };
    }, [studentId, sessionId, semesterId]);

    // Entering a total amount distributes it across categories in order.
    const updatePaymentAmount = (value: string) => {
        // Preserve the exact input while the user is typing.
        setPaymentAmount(value);

        let remainingCents = toCents(
            Math.max(0, Number(value) || 0)
        );

        const updatedFees = feeStructures.map((fee) => {
            const categoryDueCents = toCents(
                Math.max(
                    0,
                    Number(fee.amount) - fee.previousPaid
                )
            );

            const paymentCents = Math.min(
                remainingCents,
                categoryDueCents
            );

            remainingCents -= paymentCents;

            return {
                ...fee,
                payment: fromCents(paymentCents),
            };
        });

        setFeeStructures(updatedFees);

        const updatedInputs: Record<number, string> = {};

        updatedFees.forEach((fee) => {
            updatedInputs[fee.fee_category_id] =
                fee.payment > 0 ? fee.payment.toFixed(2) : "";
        });

        setCategoryPaymentInputs(updatedInputs);
    };

    // Editing a category updates the total payment amount.
    const updateCategoryPayment = (
        categoryId: number,
        value: string
    ) => {
        // Keep the raw string so clearing and retyping works.
        setCategoryPaymentInputs((current) => ({
            ...current,
            [categoryId]: value,
        }));

        const currentFee = feeStructures.find(
            (fee) => fee.fee_category_id === categoryId
        );

        if (!currentFee) return;

        const categoryDueCents = toCents(
            Math.max(
                0,
                Number(currentFee.amount) - currentFee.previousPaid
            )
        );

        const enteredCents = toCents(
            Math.max(0, Number(value) || 0)
        );

        const paymentCents = Math.min(
            enteredCents,
            categoryDueCents
        );

        const updatedFees = feeStructures.map((fee) =>
            fee.fee_category_id === categoryId
                ? {
                      ...fee,
                      payment: fromCents(paymentCents),
                  }
                : fee
        );

        setFeeStructures(updatedFees);

        const totalCents = updatedFees.reduce(
            (sum, fee) => sum + toCents(fee.payment),
            0
        );

        setPaymentAmount(
            totalCents > 0
                ? fromCents(totalCents).toFixed(2)
                : ""
        );
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setErrors({});
        setErrorMessage("");

        if (!studentId || !sessionId || !semesterId) {
            setErrorMessage(
                "Please select a student, academic session and semester."
            );
            return;
        }

        if (!feeStructures.length) {
            setErrorMessage(
                "No fee structure is available for this semester."
            );
            return;
        }

        const amountToSubmit = Number(paymentAmount);
        const categoryTotalCents = feeStructures.reduce(
            (sum, fee) => sum + toCents(fee.payment),
            0
        );
        const enteredTotalCents = toCents(amountToSubmit);

        if (!Number.isFinite(amountToSubmit) || amountToSubmit <= 0) {
            setErrorMessage("Enter a payment amount greater than zero.");
            return;
        }

        if (categoryTotalCents <= 0) {
            setErrorMessage(
                "Enter a payment amount in the Fee Structure section."
            );
            return;
        }

        if (categoryTotalCents !== enteredTotalCents) {
            setErrorMessage(
                "Category payments must equal the payment amount."
            );
            return;
        }

        setSaving(true);

        try {
            // Laravel expects payment_details[fee_category_id] = amount.
            const paymentDetails: Record<number, number> = {};

            feeStructures.forEach((fee) => {
                paymentDetails[fee.fee_category_id] = Number(
                    fee.payment.toFixed(2)
                );
            });

            await api.post("fee-payments", {
                student_id: Number(studentId),
                academic_session_id: Number(sessionId),
                semester_id: Number(semesterId),
                payment_date: paymentDate,
                payment_amount: amountToSubmit,
                payment_details: paymentDetails,
            });

            navigate("/fee-payments", {
                state: {
                    successMessage: "Fee payment created successfully.",
                },
            });
        } catch (error: any) {
            const response = error.response?.data;

            if (response?.errors) {
                setErrors(response.errors);
            }

            setErrorMessage(
                response?.message || "Failed to create fee payment."
            );
        } finally {
            setSaving(false);
        }
    };

    const fieldError = (field: keyof FeePaymentErrors) =>
        errors[field]?.map((message, index) => (
            <p key={index} className="mt-1 text-sm text-red-500">
                {message}
            </p>
        ));

    return (
        <main className="w-full min-w-0 px-6 pb-8">
            <PageHeading
                title="Create Fee Payment"
                subtitle="Record a student's fee payment and review their outstanding balance."
                buttonText="Back to Fee Payment"
                buttonColor="blue"
                buttonLink="/fee-payments"
                icon="back"
            />

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {errorMessage && (
                    <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
                    >
                        {errorMessage}
                    </div>
                )}

                {loadingForm ? (
                    <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow-xs dark:bg-gray-800 dark:text-gray-400">
                        Loading form data...
                    </div>
                ) : (
                    <>
                        <section className="rounded-xl bg-white p-5 shadow-xs dark:bg-gray-800 sm:p-7">
                            <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Payment Information
                                </h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Choose the student, session, semester and payment date.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                <div>
                                    <label className={labelClass}>
                                        Student *
                                    </label>
                                    <select
                                        className={inputClass}
                                        value={studentId}
                                        onChange={(event) =>
                                            updateStudent(event.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Student
                                        </option>
                                        {students.map((student) => (
                                            <option
                                                key={student.id}
                                                value={student.id}
                                            >
                                                {student.student_id
                                                    ? `${student.student_id} - `
                                                    : ""}
                                                {student.name}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldError("student_id")}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Academic Session *
                                    </label>
                                    <select
                                        className={inputClass}
                                        value={sessionId}
                                        onChange={(event) =>
                                            updateSession(event.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Academic Session
                                        </option>
                                        {sessions.map((session) => (
                                            <option
                                                key={session.id}
                                                value={session.id}
                                            >
                                                {session.name}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldError("academic_session_id")}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Semester *
                                    </label>
                                    <select
                                        className={inputClass}
                                        value={semesterId}
                                        onChange={(event) =>
                                            setSemesterId(event.target.value)
                                        }
                                        disabled={!sessionId}
                                        required
                                    >
                                        <option value="">
                                            Select Semester
                                        </option>
                                        {filteredSemesters.map((semester) => (
                                            <option
                                                key={semester.id}
                                                value={semester.id}
                                            >
                                                {semester.name}
                                            </option>
                                        ))}
                                    </select>
                                    {fieldError("semester_id")}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Payment Date *
                                    </label>
                                    <input
                                        type="date"
                                        className={inputClass}
                                        value={paymentDate}
                                        onChange={(event) =>
                                            setPaymentDate(event.target.value)
                                        }
                                        required
                                    />
                                    {fieldError("payment_date")}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Payment Amount (৳) *
                                    </label>
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        className={inputClass}
                                        placeholder="Enter payment amount"
                                        value={paymentAmount}
                                        onChange={(event) =>
                                            updatePaymentAmount(
                                                event.target.value
                                            )
                                        }
                                        required
                                    />
                                    {fieldError("payment_amount")}
                                </div>
                            </div>
                        </section>

                        <section className="overflow-hidden rounded-xl bg-white shadow-xs dark:bg-gray-800">
                            <div className="border-b border-gray-200 p-5 dark:border-gray-700 sm:p-7">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Fee Structure
                                </h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Review the fee categories, previous payments and remaining
                                    balance.
                                </p>
                            </div>

                            {!semesterId ? (
                                <div className="m-5 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center dark:border-gray-600 dark:bg-gray-700/30">
                                    <p className="font-medium text-gray-700 dark:text-gray-200">
                                        Select a semester to view its fee structure.
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Available fee categories and amounts will appear here.
                                    </p>
                                </div>
                            ) : loadingFees || loadingPrevious ? (
                                <div className="px-5 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                    Loading fee and previous payment details...
                                </div>
                            ) : feeStructures.length === 0 ? (
                                <div className="m-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-5 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
                                    No fee structure found for this semester, or the fee
                                    structure API is unavailable.
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[760px] text-left text-sm">
                                            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-700/70 dark:text-gray-300">
                                                <tr>
                                                    <th className="px-5 py-4">
                                                        Fee Category
                                                    </th>
                                                    <th className="px-5 py-4 text-right">
                                                        Fee Amount
                                                    </th>
                                                    <th className="px-5 py-4 text-right">
                                                        Previous Paid
                                                    </th>
                                                    <th className="px-5 py-4 text-right">
                                                        Pay Now
                                                    </th>
                                                    <th className="px-5 py-4 text-right">
                                                        Remaining Due
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                                {feeStructures.map((fee) => {
                                                    const remaining = Math.max(
                                                        0,
                                                        Number(fee.amount) -
                                                            fee.previousPaid -
                                                            fee.payment
                                                    );

                                                    return (
                                                        <tr
                                                            key={fee.fee_category_id}
                                                            className="transition hover:bg-gray-50 dark:hover:bg-gray-700/40"
                                                        >
                                                            <td className="px-5 py-4 font-medium text-gray-800 dark:text-gray-100">
                                                                {fee.fee_category?.name ??
                                                                    "Fee Category"}
                                                            </td>

                                                            <td className="px-5 py-4 text-right text-gray-600 dark:text-gray-300">
                                                                {money(
                                                                    Number(fee.amount)
                                                                )}
                                                            </td>

                                                            <td className="px-5 py-4 text-right text-gray-600 dark:text-gray-300">
                                                                {money(
                                                                    fee.previousPaid
                                                                )}
                                                            </td>

                                                            <td className="px-5 py-3">
                                                                <input
                                                                    aria-label={`Payment for ${fee.fee_category?.name}`}
                                                                    type="number"
                                                                    min="0"
                                                                    max={Math.max(
                                                                        0,
                                                                        Number(fee.amount) -
                                                                            fee.previousPaid
                                                                    )}
                                                                    step="0.01"
                                                                    className="w-32 rounded-lg border border-gray-300 bg-white px-3 py-2 text-right text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900"
                                                                    value={
                                                                        categoryPaymentInputs[
                                                                            fee.fee_category_id
                                                                        ] ?? ""
                                                                    }
                                                                    onChange={(event) =>
                                                                        updateCategoryPayment(
                                                                            fee.fee_category_id,
                                                                            event.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </td>

                                                            <td className="px-5 py-4 text-right font-medium text-amber-600 dark:text-amber-400">
                                                                {money(remaining)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>

                                            <tfoot className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50">
                                                <tr>
                                                    <th className="px-5 py-4 text-gray-800 dark:text-white">
                                                        Total
                                                    </th>
                                                    <th className="px-5 py-4 text-right text-gray-800 dark:text-white">
                                                        {money(totalAmount)}
                                                    </th>
                                                    <th className="px-5 py-4 text-right text-gray-800 dark:text-white">
                                                        {money(
                                                            feeStructures.reduce(
                                                                (sum, fee) =>
                                                                    sum + fee.previousPaid,
                                                                0
                                                            )
                                                        )}
                                                    </th>
                                                    <th className="px-5 py-4 text-right text-blue-600 dark:text-blue-400">
                                                        {money(detailPaymentTotal)}
                                                    </th>
                                                    <th className="px-5 py-4 text-right text-amber-600 dark:text-amber-400">
                                                        {money(dueAmount)}
                                                    </th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    {fieldError("payment_details")}
                                </>
                            )}
                        </section>

                        <section className="rounded-xl bg-white p-5 shadow-xs dark:bg-gray-800 sm:p-7">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Payment Summary
                            </h2>

                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Total Amount
                                    </p>
                                    <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                                        {money(totalAmount)}
                                    </p>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Previous Paid
                                    </p>
                                    <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                                        {money(previousPaid)}
                                    </p>
                                </div>

                                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        Payment Now
                                    </p>
                                    <p className="mt-2 text-xl font-bold text-blue-700 dark:text-blue-300">
                                        {money(detailPaymentTotal)}
                                    </p>
                                </div>

                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
                                    <p className="text-sm text-amber-700 dark:text-amber-300">
                                        Due Amount
                                    </p>
                                    <p className="mt-2 text-xl font-bold text-amber-700 dark:text-amber-300">
                                        {money(dueAmount)}
                                    </p>
                                </div>
                            </div>

                            {selectedStudent && (
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                    Payment for{" "}
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                                        {selectedStudent.name}
                                    </span>
                                    {sessions.find(
                                        (item) => item.id === Number(sessionId)
                                    )?.name
                                        ? ` · ${
                                              sessions.find(
                                                  (item) =>
                                                      item.id === Number(sessionId)
                                              )?.name
                                          }`
                                        : ""}
                                </p>
                            )}
                        </section>

                        <div className="flex flex-wrap justify-end gap-3">
                            <Link
                                to="/fee-payments"
                                className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={
                                    saving ||
                                    loadingFees ||
                                    loadingPrevious ||
                                    !semesterId ||
                                    feeStructures.length === 0
                                }
                                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-blue-900"
                            >
                                {saving
                                    ? "Creating Payment..."
                                    : "Create Payment"}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </main>
    );
}