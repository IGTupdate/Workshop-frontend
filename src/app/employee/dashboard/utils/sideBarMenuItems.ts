import { CustomerSideBarMenuItems } from "@/app/dashboard/__components/__desktopComponents/CustomerSideBarMenuItems";
import { MenuProps } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export type TsideBarMenuItems = {
    key: string,
    label: string,
    pathname?: string,
    children?: TsideBarMenuItems[];
};

export const sideBarMenuItems: TsideBarMenuItems[] = [
    {
        key: '1',
        label: 'Dashboard',
        pathname: "/employee/dashboard",
    },
    {
        key: '2',
        label: 'Appointment',
        pathname: "/employee/dashboard/appointment"
    },
    {
        key: '3',
        label: 'Work Order',
        pathname: "/employee/dashboard/workorder"
    },
    // {
    //     key: '4',
    //     label: 'Work Order',
    //     children: [
    //         {
    //             key: '5',
    //             label: 'Create',
    //             pathname: "/employee/dashboard/workorder/have",
    //         }
    //     ]
    // },
    {
        key: '6',
        label: "Slot Management",
        children: [
            {
                key: '7',
                label: 'Calender',
                pathname: "/employee/dashboard/slot-management/calender",
            },
            {
                key: '8',
                label: 'Slot Schedule',
                pathname: "/employee/dashboard/slot-management/slot-schedule",
            }
        ]
    },
    {
        key: '9',
        label: 'Employee',
        pathname: "/employee/dashboard/workorder"
    },

];

export function getSideBarMenuItems(router: AppRouterInstance, sideBarMenuItems: TsideBarMenuItems[], dashBoardIcons: any,)
    : MenuProps["items"] {

    return sideBarMenuItems.map((item) => {
        let children = item.children ? getSideBarMenuItems(router, item.children, dashBoardIcons) : undefined;
        return {
            ...item,
            children,
            icon: dashBoardIcons[item.label.replace(/\s/g, '')],
            onClick: () => {
                if (item.pathname) {
                    router.push(item.pathname);
                }
            },
        };
    });
}

export const findRecursiveByPathName = (sideBarMenuItems: TsideBarMenuItems[], pathname: string): TsideBarMenuItems | null => {


    for (const item of sideBarMenuItems) {
        // console.log(pathname, item?.pathname?.substring(19), pathname.substring(19).includes(item?.pathname?.substring(19)|| "-" ))
        if (item.pathname && (pathname === item.pathname || pathname.substring(pathname.split("/")[1] === 'dashboard' ? 10 : 19).includes(item.pathname.substring(pathname.split("/")[1] === 'dashboard' ? 10 : 19) || "-"))) {
            return item;
        }
        else if (item.children) {
            const required_item = findRecursiveByPathName(item.children, pathname);
            if (required_item) return required_item;
        }
    }

    return null;
};

export const findRecursiveByPathNameExact = (sideBarMenuItems: TsideBarMenuItems[], pathname: string): TsideBarMenuItems | null => {

    for (const item of sideBarMenuItems) {
        // console.log(pathname, item?.pathname?.substring(19), pathname.substring(19).includes(item?.pathname?.substring(19)|| "-" ))
        if (item.pathname && (pathname === item.pathname)) {
            return item;
        }
        else if (item.children) {
            const required_item = findRecursiveByPathName(item.children, pathname);
            if (required_item) return required_item;
        }
    }

    return null;
};


export function getActiveSideBarMenu(pathname: string): string {
    const active_menu = findRecursiveByPathName(pathname.split("/")[1] === 'dashboard' ? CustomerSideBarMenuItems : sideBarMenuItems, pathname);
    if (!active_menu) return "1";
    return active_menu.key;
}