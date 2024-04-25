import { TRamp } from "./ramp"

export type TEmployee = {
    userType: "employee",
    _id:string,
    fullName: string,
    email:string,
    roleId:string,
}

export type TEmployeeWorkStatus = {
    _id: string,
    fullName: string,
    contactNumber: string,
    email: string,
    roleId: string,
    assigned_workOrder: {
        _id: string,
        ramdId?: TRamp | string,
        orderNumber:string
        estimatedTimeOfCompletion?: string
    }[]
}