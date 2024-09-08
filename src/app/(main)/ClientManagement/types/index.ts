export interface Product {
    id: number
    name: string
    price: number
}

export interface BillItem extends Product {
    quantity: number
}

// types/index.ts
export type FormDatatype = {
    name: string;
    phone: string;
    address: string;
    dateOfBirth?: string | null;
    top?: string | null;
    chest?: string | null;
    waist?: string | null;
    seat?: string | null;
    shoulder?: string | null;
    sleeve?: string | null;
    churidar?: string | null;
    patiala?: string | null;
    stand?: string | null;
    back?: string | null;
    front?: string | null;
    flare?: string | null;
    vCut?: string | null;
};