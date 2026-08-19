export interface Category {
    id: number;
    name: string;
    description: string;
    booksCount: number;
    status: "Active" | "Inactive";
}