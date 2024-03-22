import toast from "react-hot-toast";
import { apiOpenConnector } from "../../apiOpenConnector";
import { authEndpoints } from "../../apis";

const {
    EMPLOYEE_LOGIN_API
} = authEndpoints;

export async function employeeLogin(email : string, password : string){
    try{
        const authResult = await apiOpenConnector({
            method: "POST",
            url: EMPLOYEE_LOGIN_API,
            bodyData: {
                email,
                password
            }
        });

        if (authResult?.data?.success) {
            window.localStorage.setItem('accessToken', authResult?.data?.accessToken);
            window.localStorage.setItem('isEmployee', 'true');
            toast.success("LOGIN SUCCESSFULL");
        }
    }catch(err){
        toast.error('LOGIN FAILED')
        throw err
    }
}