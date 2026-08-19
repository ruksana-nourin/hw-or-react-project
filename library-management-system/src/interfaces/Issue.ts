export interface Issue {
    id: number;
    issueCode: string;

    memberId: number;
    memberCode: string;
    memberName: string;

    bookId: number;
    bookTitle: string;
    isbn: string;

    issueDate: string;
    dueDate: string;
    returnDate: string;

    status: "Issued" | "Returned" | "Late";

    fineAmount: number;
    fineStatus: "No Fine" | "Unpaid" | "Paid";
}