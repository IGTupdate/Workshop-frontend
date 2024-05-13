"use client";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { GrBook } from "react-icons/gr";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import {
  getActiveSideBarMenu,
  getSideBarMenuItems,
  TsideBarMenuItems,
} from "@/app/[locale]/employee/dashboard/utils/sideBarMenuItems";
import { useTranslations } from "next-intl";
import { MdOutlineDesktopWindows } from "react-icons/md";
// import { CustomerSideBarMenuItems } from "./CustomerSideBarMenuItems";

const SideBarMenus = () => {
  const t = useTranslations("CustomerSidebar");

  const dashBoardIcons = {
    [t("dashboard")]: <RxDashboard size={22} />,
    [t("profile")]: <CgProfile size={22} />,
    [t("appointment")]: <MdOutlineDesktopWindows size={22} />,
    [t("previousBookings")]: <GrBook size={22} />,
    [t("notifications")]: <IoNotifications size={22} />,
    [t("settings")]: <IoSettingsOutline size={22} />,
  };

  const CustomerSideBarMenuItems: TsideBarMenuItems[] = [
    {
      key: "1",
      label: `${t("dashboard")}`,
      pathname: "/dashboard",
    },
    {
      key: "2",
      label: `${t("profile")}`,
      pathname: "/dashboard/profile",
    },
    {
      key: "3",
      label: `${t("appointment")}`,
      children: [
        {
          key: "4",
          label: `${t("book")}`,
          pathname: "/dashboard/appointment/book",
        },
        {
          key: "5",
          label: `${t("reschedule")}`,
          pathname: "/dashboard/appointment/reschedule",
        },
        {
          key: "6",
          label: `${t("cancel")}`,
          pathname: "/dashboard/appointment/cancel",
        },
      ],
    },
    {
      key: "7",
      label: `${t("previousBookings")}`,
      pathname: "/dashboard/previous-appointments",
    },
    {
      key: "8",
      label: `${t("notifications")}`,
      pathname: "/dashboard/notifications",
    },
    {
      key: "9",
      label: `${t("settings")}`,
      pathname: "/dashboard/settings",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  // sidebar menus
  const sideBarMenus = getSideBarMenuItems(
    router,
    CustomerSideBarMenuItems,
    dashBoardIcons,
  );

  const activeDashboardKey = getActiveSideBarMenu(pathname);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[activeDashboardKey]}
      theme="light"
      defaultOpenKeys={[activeDashboardKey]}
      items={sideBarMenus}
    />
  );
};

export default SideBarMenus;
