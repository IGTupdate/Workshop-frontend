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
import { CustomerSideBarMenuItems } from "./CustomerSideBarMenuItems";

const SideBarMenus = () => {
  const t = useTranslations("CustomerSidebar");

  const dashBoardIcons = {
    [t("dashboard")]: <RxDashboard size={20} />,
    [t("profile")]: <CgProfile size={20} />,
    [t("appointment")]: <MdOutlineDesktopWindows size={20} />,
    [t("previousBookings")]: <GrBook size={20} />,
    [t("notifications")]: <IoNotifications size={20} />,
    [t("settings")]: <IoSettingsOutline size={20} />,
  };

  const router = useRouter();
  const pathname = usePathname();

  // sidebar menus
  const sideBarMenus = getSideBarMenuItems(
    router,
    CustomerSideBarMenuItems(),
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
