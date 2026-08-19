export interface Book {
    id: number;
    title: string;
    isbn: string;
    author: string;
    category: string;
    publisher: string;
    copies: number;
    availableCopies: number;
    status: "Available" | "Issued" | "Reserved";
    cover: string;
}