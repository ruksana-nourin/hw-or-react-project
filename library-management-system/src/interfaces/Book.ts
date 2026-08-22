export interface Book {
    id?: number;

    title: string;
    isbn: string;

    author_id: number;
    author?: string;

    category_id: number;
    category?: string;

    publisher_id: number;
    publisher?: string;

    copies: number;


    status_id: number;
    status?: string;

    cover_image?: File | null;
    cover?: string;
}


export const defaultBook: Book = {
    title: "",
    isbn: "",

    author_id: 0,
    category_id: 0,
    publisher_id: 0,

    copies: 1,


    status_id: 1,

    cover_image: null
};
