'use client'
import { getActiveSideBarMenu, getSideBarMenuItems, sideBarMenuItems } from '@/app/employee/dashboard/utils/CustomerSideBarMenuItems';
import { DesktopOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { CgProfile } from "react-icons/cg";
import { IoIosApps } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { GrBook } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

const dashBoardIcons = {
    Dashboard: <RxDashboard />,
    Appointment: <DesktopOutlined />,
    Profile: <CgProfile/>,
    SlotAvailability: <IoIosApps />,
    PreviousBookings: <GrBook/>,
    Settings: <IoSettingsOutline/>
}

type Props = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    isSmallDevice: boolean
}

const SideBarMenus = ({ collapsed, setCollapsed, isSmallDevice }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    // sidebar menus
    const sideBarMenus = getSideBarMenuItems(router, sideBarMenuItems, dashBoardIcons, setCollapsed, isSmallDevice);

    const activeDashboardKey = getActiveSideBarMenu(pathname);

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={[activeDashboardKey]}
            theme='dark'
            defaultOpenKeys={['sub1']}
            items={sideBarMenus}
            disabled={collapsed}
        />
    )
}

export default SideBarMenus;
