import { TAppointment } from "./appointment";
import { TEmployee } from "./employee";

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
    _id?: string;
};


export type TWorkOrder = {
    orderNumber: string;
    appointmentId: string | TAppointment;
    advisorId: string | TEmployee;
    mechanicId: string[] | TEmployee[];
    status: string;
    estimatedCost?: number;
    estimatedTimeOfCompletion?: Date;
    serviceType?: string;
    notes?: string;
    rampId: string;
    tasks: TTask[];
    partsRequested: TPartRequested[];
    partsRequiredInvoice: string[];
    current_location: string;
};
