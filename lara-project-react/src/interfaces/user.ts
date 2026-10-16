export interface User {
    id: number;
    name: string;
    email: string;
    role ?: string;
    role_id ?: number |any;
    password ?: string;
    password_confirmation ?: string;
    created_at ?: string;
    updated_at ?: string;
}
export const defaultUser: User = {
    id: 0,
    name: "",
    email: "",
    role_id: 0,
    password: "",
}
export const errorUser: User = {
    id: 0,
    name: "",
    email: "",
    role_id: "",
    password: "",
    password_confirmation: "",
}

