const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL || '';
const APPOINTMENT_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_APPOINTMENT_SERVICE_BASE_URL + "/api";
const WORK_ORDER_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_WORK_ORDER_SERVICE_BASE_URL + "/api";
const CONSUMER_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_CONSUMER_BASE_URL || '';

// const AUTH_BASE_URL = 'http://localhost:4000';
// const APPOINTMENT_SERVICE_BASE_URL = 'http://localhost:5000' + "/api";
// const WORK_ORDER_SERVICE_BASE_URL = 'http://localhost:4100' + "/api";
// const CONSUMER_SERVICE_BASE_URL = 'http://localhost:4200'

const createUrl = (baseUrl: string, ...paths: string[]) => `${baseUrl}${paths.join('')}`;

// Define common endpoint paths
const CUSTOMER = '/customer';
const AUTH = '/auth';
const EMPLOYEE = '/employee';
const SLOT_SCHEDULE = '/slot_schedule';
const SLOTS = '/slots';
const CALENDAR = "/calendar";
const APPOINTMENT = "/appointment";
const VEHICLE = "/vehicle";
const CANCEL = "/cancel";
const RAMP = '/ramp';

// Define endpoint generators
const authUrl = (...paths: string[]) => createUrl(AUTH_BASE_URL, ...paths);
const appointmentUrl = (...paths: string[]) => createUrl(APPOINTMENT_SERVICE_BASE_URL, ...paths);
const workOrderUrl = (...paths: string[]) => createUrl(WORK_ORDER_SERVICE_BASE_URL, ...paths);
const notificationUrl = (...paths: string[]) => createUrl(CONSUMER_SERVICE_BASE_URL, ...paths);

// Define endpoint objects
export const authEndpoints = {
  SEND_OTP_API: authUrl(CUSTOMER, "/sendOtp"),
  VERIFY_OTP_API: authUrl(CUSTOMER, "/verifyOtp"),
  AUTH_API: authUrl(CUSTOMER, "/auth"),
  GENERATE_ACCESS_TOKEN_API: authUrl(AUTH, "/generateAccessToken"),
  EMPLOYEE_LOGIN_API: authUrl(EMPLOYEE, "/login"),
  GET_CUSTOMER_DATA_API: authUrl(CUSTOMER),
  GET_EMPLOYEE_DATA_API: authUrl(EMPLOYEE),
  LOGOUT_API: authUrl(AUTH, '/logout'),
  CUSTOMER_UPDATE_API: authUrl(CUSTOMER, '/update')
};

export const appointmentEndpoints = {
  CREATE_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/create"),
  GET_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/get-by-id"),
  GET_ALL_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/get-all"),
  UPDATE_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/update"),
  DELETE_SLOT_SCHEDULE_API: appointmentUrl(SLOT_SCHEDULE, "/delete"),
  GET_AVAILABLE_SLOTS_API: appointmentUrl(SLOTS, '/get-available'),
  GET_ALL_CALENDAR: appointmentUrl(CALENDAR, "/get-all"),
  CREATE_CALENDAR: appointmentUrl(CALENDAR, "/create"),
  UPDATE_CALENDAR_STATUS: appointmentUrl(CALENDAR, "/update-status"),
  GET_APPOINTMENT_BY_CALENDAR: appointmentUrl(APPOINTMENT, "/get-by-calendar"),
  GET_APPOINTMENT_BY_APPOINTMENT_ID: appointmentUrl(APPOINTMENT, "/get"),
  GET_ALL_APPOINTMENT: appointmentUrl(APPOINTMENT, "/get-all"),
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
  DELETE_VEHICLE_BY_CUSTOMER_ID: appointmentUrl(VEHICLE, "/delete")
};

export const workOrderEndpoints = {
  GET_EMPLOYEE_WORK_STATUS: workOrderUrl("/employee/status"),
  CREATE_WORK_ORDER: workOrderUrl("/workorder/create"),
  GET_ALL_WORK_ORDER: workOrderUrl("/workorder/get-all"),
  RAMP_CREATE_API: workOrderUrl("/create"),
  GET_ALL_RAMP_API: workOrderUrl(RAMP, "/get"),
  GET_ALL_RAMP_STATUS_API: workOrderUrl(RAMP, "/get/status")
};


export const notificationEndpoints = {
  GET_ALL_NOTIFICATIONS: notificationUrl("/notification/get-all")
};