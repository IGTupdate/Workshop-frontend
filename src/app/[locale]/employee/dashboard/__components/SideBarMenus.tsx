"use client";

import React, { useEffect, useState } from "react";
import { FaTruckRampBox } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { IoIosApps } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdSchedule } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { DesktopOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "antd";
import {
  getActiveSideBarMenu,
  getSideBarMenuItems,
  sideBarMenuItems,
} from "../utils/sideBarMenuItems";
import useAbility from "@/app/__hooks/useAbility";
import { useAppSelector } from "@/app/store/reduxHooks";
import { ItemType } from "antd/es/menu/hooks/useItems";

const dashBoardIcons = {
  // label: iconsreact
  Dashboard: <RxDashboard />,
  Appointment: <DesktopOutlined />,
  SlotManagement: <IoIosApps />,
  Calender: <FaRegCalendarAlt />,
  SlotSchedule: <MdSchedule />,
  WorkOrder: <FaHouseUser />,
  Employee: <FaRegUser />,
  Ramp: <FaTruckRampBox />,
};

type Props = {};

const SideBarMenus = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const ability = useAbility();

  const sideBarMenus = getSideBarMenuItems(
    router,
    sideBarMenuItems,
    dashBoardIcons,
    ability,
  );

  const activeDashboardKey = getActiveSideBarMenu(pathname);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[activeDashboardKey]}
      // theme='dark'
      defaultOpenKeys={["sub1"]}
      items={sideBarMenus}
    />
  );
};

export default SideBarMenus;
