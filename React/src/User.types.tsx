export interface User {
    id: number |null;
    name: string;
    email: string;
    phone?: string | null | number;
    roleId?: number;
    isActive: boolean;
}
const defaultUser: User = {
        id: null,
        name: "",
        email: "example@mail.com",
        phone: "123654",
        roleId: 5,
        isActive: true
}
export default defaultUser