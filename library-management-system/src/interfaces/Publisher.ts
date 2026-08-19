export interface Publisher {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    booksCount: number;
    status: "Active" | "Inactive";
}