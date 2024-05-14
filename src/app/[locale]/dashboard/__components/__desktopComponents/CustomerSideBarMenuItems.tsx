import { TsideBarMenuItems } from "@/app/[locale]/employee/dashboard/utils/sideBarMenuItems"; // Import TsideBarMenuItem from your sideBarMenuItems file
import { useTranslations } from "next-intl";

export const CustomerSideBarMenuItems: () => TsideBarMenuItems[] = () => {
  const t = useTranslations("CustomerSidebar");

  return [
    {
      key: "1",
      label: t("dashboard"),
      pathname: "/dashboard",
    },
    {
      key: "2",
      label: t("profile"),
      pathname: "/dashboard/profile",
    },
    {
      key: "3",
      label: t("appointment"),
      children: [
        {
          key: "4",
          label: t("book"),
          pathname: "/dashboard/appointment/book",
        },
        {
          key: "5",
          label: t("reschedule"),
          pathname: "/dashboard/appointment/reschedule",
        },
        {
          key: "6",
          label: t("cancel"),
          pathname: "/dashboard/appointment/cancel",
        },
      ],
    },
    {
      key: "7",
      label: t("previousBookings"),
      pathname: "/dashboard/previous-appointments",
    },
    {
      key: "8",
      label: t("notifications"),
      pathname: "/dashboard/notifications",
    },
    {
      key: "9",
      label: t("settings"),
      pathname: "/dashboard/settings",
    },
  ];
};
