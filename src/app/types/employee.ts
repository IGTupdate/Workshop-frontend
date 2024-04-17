import { TRamp } from "./ramp"

export type TEmployee = {
    userType: "employee"
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
        estimatedTimeOfCompletion?: string
    }[]
}