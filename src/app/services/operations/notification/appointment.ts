import { apiConnector } from "../../apiConnector";
import { notificationEndpoints } from "../../apis";

const {
  GET_ALL_APPOINTMENT_NOTIFICATIONS,
  GET_ALL_USER_NOTIFICATIONS,
  GET_INIT_NOTIFICATIONS,
} = notificationEndpoints;

export async function appointmentNotification(appointmentId: string) {
  try {
    const notifications = await apiConnector({
      method: "GET",
      url:
        GET_ALL_APPOINTMENT_NOTIFICATIONS + "?appointmentId=" + appointmentId,
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

export async function userNotification(userId: string) {
  try {
    const notifications = await apiConnector({
      method: "GET",
      url: GET_ALL_USER_NOTIFICATIONS + "?userId=" + userId,
    });

    if (notifications?.data?.success) {
      return notifications.data.data; // Return notifications
    }
  } catch (err) {
    // Handle errors
    console.error("NO User Found", err);
    // throw err; // Rethrow the error for the caller to handle
  }
}

export async function initNotification(
  userId?: string,
  appointmentId?: string,
  limit?: number,
) {
  try {
    const queryParams = new URLSearchParams();
    if (userId) queryParams.append("userId", userId);
    if (appointmentId) queryParams.append("appointmentId", appointmentId);
    if (limit) queryParams.append("limit", limit.toString());

    const url =
      GET_ALL_USER_NOTIFICATIONS +
      (queryParams.toString() ? "?" + queryParams.toString() : "");
    const notifications = await apiConnector({
      method: "GET",
      url: url,
    });

    if (notifications?.data?.success) {
      return notifications.data.data; // Return notifications
    }
  } catch (err) {
    // Log and handle errors
    console.error("Error fetching notifications:", err);
    // throw err; // Rethrow the error for the caller to handle
    return null;
  }
}
