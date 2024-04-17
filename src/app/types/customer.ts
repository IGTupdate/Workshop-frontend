import { TEmployee } from "./employee"

export type TCustomer = {
    contactNumber: string,
    fullName: string,
    email: string,
    _id: string,
    userType: "customer"
}



export type TUser = TEmployee | TCustomer