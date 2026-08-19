export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role_id?: number;
    role: "Admin" | "Librarian" | "Staff";
    status_id?: number;
    status: "Active" | "Inactive";
    department_id?: number;
    department?: string;
    created_at: string;
    last_login?: string;
    address?: string;
    notes?: string;

}
export const defaultUser: User = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    role: "Librarian",
    status: "Active",
    created_at: "",
};