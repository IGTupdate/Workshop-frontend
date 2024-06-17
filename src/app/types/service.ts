export interface IServiceCategory {
  _id: string;
  name: string;
  isActive?: boolean;
  vehicle_type: string;
}
export interface IServiceTask {
  _id: string;
  name: string;
  vehicle_type: string;
}
export type TParts = {
  _id: string;
  partId?: string | null;
  partName: string;
};

export type TServicePlans = {
  _id: string;
  name: string;
  description: string[];
  price: number;
  duration?: number;
  category: IServiceCategory | string;
  isActive?: boolean;
  tasks?: IServiceTask[];
  parts?: TParts[];
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
  vehicle_type: string;
};

export interface TSegregatedServiceData {
  [categoryId: string]: {
    category: IServiceCategory;
    plans: TServicePlans[];
  };
}

export type TServicePlansCreate = {
  duration?: number | undefined;
  parts?:
    | {
        part_id: string;
        part_name: string;
      }[]
    | undefined;
  isActive?: boolean | undefined;
  remarks?: string | undefined;
  category: string;
  tasks: (string | undefined)[];
  name: string;
  description: string[];
  price: number;
  vehicle_type: string;
};
