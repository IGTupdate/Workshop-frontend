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
    category: IServiceCategory;
    isActive?: boolean;
    tasks?: IServiceTask[]
    parts?: TParts[]
    remarks?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TSegregatedServiceData {
    [categoryId: string]: {
        category: IServiceCategory;
        plans: TServicePlans[];
    };
}