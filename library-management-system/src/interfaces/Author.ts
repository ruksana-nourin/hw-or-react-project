export interface Author {
    id: number;
    name: string;
    email: string;
    phone?: string;
    booksCount: number;
    status: "Active" | "Inactive";
}