
export interface FeeCategory {
    id: number;
    name: string;
}

export const defaultFeeCategory: FeeCategory = {
    id: 0,
    name: "",
};

export interface FeeCategoryErrors {
    name?: string
}