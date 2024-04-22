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


        return notifications.data.data; // Return the OTP request result
    } catch (err) {
        // Handle errors
        // console.error("Error sending OTP:", err);
        //   toast.error("Failed to send OTP. Please try again later.");
        throw err; // Rethrow the error for the caller to handle
    }
}