import { useTranslations } from "use-intl";

export const slot_booking_step = [
  {
    title: "Slot",
    description: "Select your Available time",
  },
  {
    title: "Customer",
    description: "Tell your Identity",
    // subTitle: 'Left 00:00:08',
  },
  {
    title: "Vehicle",
    description: "Fill vehicle Info",
  },
  {
    title: "Review",
    description: "Finalise your",
  },
];

export const Slot_booking_customer_step = () => {
  const t = useTranslations("SlotBookingCustomerStep");
  return [
    {
      title: `${t("slot")}`,
      description: `${t("selectTime")}`,
    },
    {
      title: `${t("vehicle")}`,
      description: `${t("fillVehicleInfo")}`,
    },
    {
      title: `${t("servicePlans")}`,
      description: `${t("selectServicePlans")}`,
    },
    {
      title: `${t("review")}`,
      description: `${t("finaliseyourAppointment")}`,
    },
  ];
};

export const slot_booking_customer_reschedule_step = [
  {
    title: "Slot",
    description: "Select Time",
  },
  {
    title: "Review",
    description: "Your Appointment",
  },
];
