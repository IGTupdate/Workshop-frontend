"use client";

import React, { useEffect, useState } from "react";
import { FaTruckRampBox } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { IoIosApps } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineDesktopWindows, MdSchedule } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { DesktopOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Skeleton } from "antd";
import {
  getActiveSideBarMenu,
  getSideBarMenuItems,
  SideBarMenuItems,
} from "../utils/sideBarMenuItems";
import useAbility from "@/app/__hooks/useAbility";
import { useAppSelector } from "@/app/store/reduxHooks";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useTranslations } from "next-intl";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";

type Props = {};

const SideBarMenus = (props: Props) => {
  const t = useTranslations("EmployeeSideBar");
  const dashBoardIcons = {
    // label: iconsreact
    [t("dashboard")]: <RxDashboard size={20} />,
    [t("appointment")]: <MdOutlineDesktopWindows size={20} />,
    [t("slotManagement")]: <IoIosApps size={20} />,
    [t("calender")]: <FaRegCalendarAlt />,
    [t("slotSchedule")]: <MdSchedule size={20} />,
    [t("workOrder")]: <FaHouseUser size={20} />,
    [t("employee")]: <FaRegUser size={20} />,
    [t("ramp")]: <FaTruckRampBox size={20} />,
    [t("settings")]: <IoSettingsOutline size={20} />,
    [t("vehicleManagement")]: <FaCar size={20} />,
    [t("vehicleManagementCheckList")]: <GoChecklist size={20} />,
  };

  const router = useRouter();
  const pathname = usePathname();
  const ability = useAbility();

  const sideBarMenus = getSideBarMenuItems(
    router,
    SideBarMenuItems(),
    dashBoardIcons,
    ability,
  );

  const activeDashboardKey = getActiveSideBarMenu(pathname);

  return (
    <>
      {ability !== undefined ? (
        <Menu
          mode="inline"
          defaultSelectedKeys={[activeDashboardKey]}
          // theme='dark'
          defaultOpenKeys={["sub1"]}
          items={sideBarMenus}
          className="w-full"
        />
      ) : (
        <MenusItmes />
      )}
    </>
  );
};

export default SideBarMenus;

const MenusItmes = () => {
  return (
    <div className="flex flex-col items-center">
      {SideBarMenuItems()?.map((menu, index) => (
        // eslint-disable-next-line react/jsx-key
        <Skeleton.Input
          active={true}
          size={"large"}
          key={index}
          className="mt-2"
        />
      ))}
    </div>
  );
};
