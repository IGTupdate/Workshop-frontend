"use client"

import React from 'react'
import { SiReacthookform } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import { IoIosApps } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdSchedule } from "react-icons/md";
import { GoNote } from "react-icons/go";
import { FaHouseUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

import { DesktopOutlined, } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, MenuProps } from 'antd';
import { getActiveSideBarMenu, getSideBarMenuItems, sideBarMenuItems } from '../utils/sideBarMenuItems';

const dashBoardIcons = {
    // label: iconsreact
    Dashboard: <RxDashboard />,
    Appointment: <DesktopOutlined />,
    SlotManagement: <IoIosApps />,
    Calender: <FaRegCalendarAlt />,
    SlotSchedule: <MdSchedule />,
    WorkOrder: <FaHouseUser />,
    Employee: <FaRegUser />
}

type Props = {}

const SideBarMenus = (props: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    // sidebar menus
    const sideBarMenus = getSideBarMenuItems(router, sideBarMenuItems, dashBoardIcons);

    const activeDashboardKey = getActiveSideBarMenu(pathname);

    // console.log(sideBarMenuItems)
    // console.log(activeDashboardKey)
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={[activeDashboardKey]}
            theme='dark'
            defaultOpenKeys={['sub1']}
            items={sideBarMenus}
        />
    )
}

export default SideBarMenus