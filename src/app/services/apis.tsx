const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL || "";
const APPOINTMENT_SERVICE_BASE_URL =
  process.env.NEXT_PUBLIC_APPOINTMENT_SERVICE_BASE_URL + "/api";
const WORK_ORDER_SERVICE_BASE_URL =
  process.env.NEXT_PUBLIC_WORK_ORDER_SERVICE_BASE_URL + "/api";
const CONSUMER_SERVICE_BASE_URL =
  process.env.NEXT_PUBLIC_CONSUMER_BASE_URL || "";

// const AUTH_BASE_URL = 'http://localhost:4000';
// const APPOINTMENT_SERVICE_BASE_URL = 'http://localhost:5000' + "/api";
// const WORK_ORDER_SERVICE_BASE_URL = 'http://localhost:4100' + "/api";
// const CONSUMER_SERVICE_BASE_URL = 'http://localhost:4200'

const createUrl = (baseUrl: string, ...paths: string[]) =>
  `${baseUrl}${paths.join("")}`;

// Define common endpoint paths
const CUSTOMER = "/customer";
const AUTH = "/auth";
const EMPLOYEE = "/employee";
const SLOT_SCHEDULE = "/slot_schedule";
const SLOTS = "/slots";
const CALENDAR = "/calender";
const APPOINTMENT = "/appointment";
const VEHICLE = "/vehicle";
const CANCEL = "/cancel";
const RAMP = "/ramp";
const WORKORDER_ACTIVITY = "/workorder-activity";
const SERVICE_CATEGORY = "/service_category";
const SERVICE_TASKS = "/service_tasks";
const SERVICE_PLANS = "/service_plans";
const WORKORDER = "/workorder";

// Define endpoint generators
const authUrl = (...paths: string[]) => createUrl(AUTH_BASE_URL, ...paths);
const appointmentUrl = (...paths: string[]) =>
  createUrl(APPOINTMENT_SERVICE_BASE_URL, ...paths);
const workOrderUrl = (...paths: string[]) =>
  createUrl(WORK_ORDER_SERVICE_BASE_URL, ...paths);
const notificationUrl = (...paths: string[]) =>
  createUrl(CONSUMER_SERVICE_BASE_URL, ...paths);

// Define endpoint objects
export const authEndpoints = {
  SEND_OTP_API: authUrl(CUSTOMER, "/sendOtp"),
  VERIFY_OTP_API: authUrl(CUSTOMER, "/verifyOtp"),
  AUTH_API: authUrl(CUSTOMER, "/auth"),
  GENERATE_ACCESS_TOKEN_API: authUrl(AUTH, "/generateAccessToken"),
  EMPLOYEE_LOGIN_API: authUrl(EMPLOYEE, "/login"),
  GET_CUSTOMER_DATA_API: authUrl(CUSTOMER),
  GET_EMPLOYEE_DATA_API: authUrl(EMPLOYEE, "/get"),
  LOGOUT_API: authUrl(AUTH, "/logout"),
  CUSTOMER_UPDATE_API: authUrl(CUSTOMER, "/update"),
  GET_ALL_EMPLOYEES: authUrl(EMPLOYEE, "/get-all"),
  GET_ACCESS: authUrl(AUTH, "/getAccess"),
  GET_CUSTOMER_AUTH_INIT: authUrl(AUTH, "/init"),
  EMPLOYEE_REGISTER: authUrl(EMPLOYEE, "/register"),
  GET_ALL_EMPLOYEE_ROLE: authUrl(EMPLOYEE, "/role/get-all"),
  UPDATE_EMPLOYEE_DETAILS: authUrl(EMPLOYEE, "/update"),
};

export const appointmentEndpoints = {
  CREATE_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/create"),
  GET_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/get-by-id"),
  GET_ALL_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/get-all"),
  UPDATE_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/update"),
  DELETE_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/delete"),
  GET_AVAILABLE_SLOTS_API: appointmentUrl(SLOTS, "/get-available"),
  GET_ALL_CALENDAR: appointmentUrl(CALENDAR, "/get-all"),
  CREATE_CALENDAR: appointmentUrl(CALENDAR, "/create"),
  UPDATE_CALENDAR_STATUS: appointmentUrl(CALENDAR, "/update-status"),
  GET_APPOINTMENT_BY_CALENDAR: appointmentUrl(APPOINTMENT, "/get-by-calender"),
  GET_APPOINTMENT_BY_APPOINTMENT_ID: appointmentUrl(APPOINTMENT, "/get"),
  GET_ALL_APPOINTMENT: appointmentUrl(APPOINTMENT, "/get-all"),
  GET_ALL_APPOINTMENT_STATUS: appointmentUrl(APPOINTMENT, "/get-status"),
  GET_PAGE_APPOINTMENT: appointmentUrl(APPOINTMENT, "/get-page"),
  GET_APPOINTMENT_BOOK_INIT_DATA: appointmentUrl(APPOINTMENT, "/book/init"),
  GET_CUSTOMER_INIT_DATA: appointmentUrl(APPOINTMENT, "/get-customer/init"),
  APPOINTMENT_BOOK: appointmentUrl(APPOINTMENT, "/book"),
  APPOINTMENT_CANCEL_API: appointmentUrl(APPOINTMENT, CANCEL),
  APPOINTMENT_RESCHEDULE_API: appointmentUrl(APPOINTMENT, "/reschedule"),
  GET_ALL_CUSTOMER_APPOINTMENT: appointmentUrl(APPOINTMENT, "/get-by-customer"),
  GET_VEHICLE: appointmentUrl(VEHICLE, "/get"),
  CREATE_VEHICLE: appointmentUrl(VEHICLE, "/create"),
  GET_VEHICLE_BY_CUSTOMER_ID: appointmentUrl(VEHICLE, "/get-by-customer"),
  UPDATE_VEHICLE_BY_CUSTOMER_ID: appointmentUrl(VEHICLE, "/update"),
  DELETE_VEHICLE_BY_CUSTOMER_ID: appointmentUrl(VEHICLE, "/delete"),
  CREATE_SERVICE_CATEGORY: appointmentUrl(SERVICE_CATEGORY, "/create"),
  UPDATE_SERVICE_CATEGORY: appointmentUrl(SERVICE_CATEGORY, "/update"),
  GET_SERVICE_CATEGORY: appointmentUrl(SERVICE_CATEGORY, "/get"),
  CREATE_SERVICE_TASK: appointmentUrl(SERVICE_TASKS, "/create"),
  UPDATE_SERVICE_TASK: appointmentUrl(SERVICE_TASKS, "/update"),
  DELETE_SERVICE_TASK: appointmentUrl(SERVICE_TASKS, "/delete"),
  GET_SERVICE_TASK: appointmentUrl(SERVICE_TASKS, "/get"),
  CREATE_SERVICE_PLAN: appointmentUrl(SERVICE_PLANS, "/create"),
  UPDATE_SERVICE_PLAN: appointmentUrl(SERVICE_PLANS, "/update"),
  DELETE_SERVICE_PLAN: appointmentUrl(SERVICE_PLANS, "/delete"),
  GET_SERVICE_PLAN: appointmentUrl(SERVICE_PLANS, "/get"),
};

export const workOrderEndpoints = {
  GET_EMPLOYEE_WORK_STATUS: workOrderUrl("/employee/status"),
  CREATE_WORK_ORDER: workOrderUrl("/workorder/create"),
  GET_ALL_WORK_ORDER: workOrderUrl("/workorder/get-all"),
  GET_PAGE_WORK_ORDER: workOrderUrl("/workorder/get-page"),
  RAMP_CREATE_API: workOrderUrl(RAMP, "/create"),
  RAMP_UPDATE_API: workOrderUrl(RAMP, "/update"),
  GET_ALL_RAMP_API: workOrderUrl(RAMP, "/get"),
  GET_ALL_RAMP_STATUS_API: workOrderUrl(RAMP, "/get/status"),
  GET_WORK_ORDER_BY_ID: workOrderUrl(WORKORDER, "/get"),
  PREPARE_WORK_ORDER: workOrderUrl(WORKORDER, "/prepare"),
  ASSIGN_MECHANIC_WORKORDER: workOrderUrl(WORKORDER, "/assign_mechanics"),
  REMOVE_MECHANIC_WORKORDER: workOrderUrl(WORKORDER, "/remove_mechanics"),
  REQUEST_ADDITIONAL_WORK: workOrderUrl(
    WORKORDER,
    "/additional_work_request/create",
  ),
  GET_ADDITIONAL_WORK: workOrderUrl(WORKORDER, "/additional_work_request/get"),
  WORK_ORDER_RAMP_ASSIGN: workOrderUrl(WORKORDER, "/assign_ramp"),
  GET_DASHBOARD_DATA: workOrderUrl("/dashboard-kanban-data"),
  GET_WORKORDER_BY_APPOINTMENT_ID: workOrderUrl(
    WORKORDER,
    "/get-by-appointmentId",
  ),
  UPDATE_ADDITIONAL_WORKS: workOrderUrl(WORKORDER, "/additional_work_request"),
  GET_WORKORDER_ACTIVITY: workOrderUrl(WORKORDER_ACTIVITY, "/get"),
  UPDATE_WORKORDER: workOrderUrl(WORKORDER_ACTIVITY, "/update"),
};

export const notificationEndpoints = {
  GET_ALL_NOTIFICATIONS: notificationUrl("/notification/get-all"),
};
