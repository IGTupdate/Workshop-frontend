import { apiConnector } from "../../apiConnector";
import { notificationEndpoints } from "../../apis";

const { GET_ALL_NOTIFICATIONS } = notificationEndpoints;

export async function appointmentNotification(appointmentId: string) {
    try {
        // Sending OTP request
        const notifications = await apiConnector({
            method: "GET",
            url: GET_ALL_NOTIFICATIONS + "/" + appointmentId,
        });

        if (notifications?.data?.success) {
            return notifications.data.data; // Return notifications
        }


    } catch (err) {

        // Handle errors
        console.error("NO Appointment Found", err);
        // throw err; // Rethrow the error for the caller to handle
    }
}


