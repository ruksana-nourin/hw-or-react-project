export interface FeeStructure {
    id: number;
    semester_id: number;
    fee_category_id: number;
    amount: number;
}

export const defaultFeeStructure: FeeStructure = {
    id: 0,
    semester_id: 0,
    fee_category_id: 0,
    amount: 0,
};

export interface FeeStructureErrors {
    semester_id?: string[];
    fee_category_id?: string[];
    amount?: string[];
}