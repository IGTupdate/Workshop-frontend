import { TAppointment } from "./appointment";
import { TCustomer } from "./customer";
import { TEmployee } from "./employee";
import { TServicePlans } from "./service";
import { TVehicle } from "./vehicle";

export type TWorkOrderStatus =
  | "Pending"
  | "Processing"
  | "Completed"
  | "Assigned";

export type TTask = {
  title: string;
  description: string;
  // after_image: string;
  // before_image: string;
  critical: boolean;
  additional_work: boolean;
  status: string;
  approved: boolean;
};

export type TTaskRequest = {
  title?: string;
  description?: string;
  critical?: boolean;
  additional_work?: boolean;
  status?: string;
  approved?: boolean;
  _id: string;
};

export type TPartRequested = {
  partId?: string;
  partName: string;
  // orderedBy: mongoose.Schema.Types.ObjectId;
  orderTime: Date;
  received: boolean;
  quantity: number;
  _id: string;
};

export type TWorkOrder = {
  _id: string;
  orderNumber: string;
  appointmentId: string | TAppointment;
  advisorId: string | TEmployee;
  mechanicId: string[] | TEmployee[];
  status: TWorkOrderStatus;
  estimatedCost?: number;
  estimatedTimeOfCompletion?: string;
  serviceType?: string;
  notes?: string;
  rampId: string;
  tasks: TTask[];
  partsRequested: TPartRequested[];
  partsRequiredInvoice: string[];
  current_location: string;
  servicePlanId?: string[] | TServicePlans[];
  odometerReading?: number;
  fuelQuantity?: number;
  observations: string[];
  createdAt: string;
  updatedAt: string;
};

export type TWorkOrderData = {
  workOrders: TWorkOrder[];
  totalWorkOrders: number;
};

export type TWorkOrderDataTable = {
  orderNumber: string;
  status: string;
  vehicle_registeration_number: string;
  _id: string;
  createdAt: Date;
};

export type TAddionalTaskRequest = {
  _id: string;
  title: string;
  description?: string;
  critical?: boolean;
  approved: boolean;
  partsRequired: {
    partId?: string;
    partName: string;
    price?: string;
  }[];
};

export type TAdditonalWorkRequest = {
  _id: string;
  workOrderId: string;
  description?: string;
  tasks: TAddionalTaskRequest[];
  estimatedCost: number;
  status: "Pending" | "Processed";
  requestby: string;
  createdAt: string;
  updatedAt: string;
};

export type TAppointmentKanbanData = {
  appointmentId: string;
  status: string;
  vehicle_id: TVehicle;
  customer_id: TCustomer;
};

export type TWorkOrderKanbanData = {
  workOrderId: string;
  vehicle_id: TVehicle;
  customer_id: TCustomer;
  createdAt: string;
};

export type TkanbanValue = TCustomer &
  TVehicle & {
    appointmentId?: string;
    workorderId?: string | undefined;
    status: string;
    appointmentDate: string;
    createdAt: string;
  };
export type TDashboardKanbanDataResponse = Record<
  string,
  (TAppointmentKanbanData | TWorkOrderKanbanData)[]
>;
