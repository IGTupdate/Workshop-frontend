'use client';
import { CustomerSideBarMenuItems } from '@/app/dashboard/__components/__desktopComponents/CustomerSideBarMenuItems';
import { DesktopOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { GrBook } from "react-icons/gr";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { getActiveSideBarMenu, getSideBarMenuItems } from '@/app/employee/dashboard/utils/sideBarMenuItems';

const dashBoardIcons = {
    Dashboard: <RxDashboard />,
    Appointment: <DesktopOutlined />,
    Profile: <CgProfile />,
    PreviousBookings: <GrBook />,
    Notifications: <IoNotifications />,
    Settings: <IoSettingsOutline />
};

const SideBarMenus = () => {
    const router = useRouter();
    const pathname = usePathname();

    // sidebar menus
    const sideBarMenus = getSideBarMenuItems(router, CustomerSideBarMenuItems, dashBoardIcons);

    const activeDashboardKey = getActiveSideBarMenu(pathname);

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={[activeDashboardKey]}
            theme='light'
            defaultOpenKeys={[activeDashboardKey]}
            items={sideBarMenus}
        />
    );
};

export default SideBarMenus;
