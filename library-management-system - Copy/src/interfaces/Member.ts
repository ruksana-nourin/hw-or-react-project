export interface Member {
    id: number;
    memberCode: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    membershipType: "Regular" | "Premium";
    registrationFee: number;
    paymentStatus: "Paid" | "Unpaid" | "Partial";
    registrationDate: string;
    status: "Active" | "Inactive";
}