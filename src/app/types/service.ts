export interface IServiceCategory {
    _id: string;
    name: string;
    isActive?: boolean;
}
export interface IServiceTask {
    _id: string;
    name: string;
}
export type TParts = {
    _id: string,
    partId?: string | null,
    partName: string
}

export type TServicePlans = {
    _id: string;
    name: string;
    description: string[];
    price: number;
    duration?: number;
    category: string | IServiceCategory;
    isActive?: boolean;
    tasks?: string[] | IServiceTask[]
    parts?: TParts[] | string[]
    remarks?: string;
    createdAt: string;
    updatedAt: string;
}