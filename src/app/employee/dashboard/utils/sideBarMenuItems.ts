import { MenuProps } from "antd"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"


export type TsideBarMenuItems = {
    key: string,
    label: string,
    pathname?: string,
    children?: TsideBarMenuItems[]
}

export const sideBarMenuItems: TsideBarMenuItems[] = [
    {
        key: '1',
        label: 'Dashboard',
        pathname: "/employee/dashboard"
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
    {
        key: '4',
        label: 'Work Order',
        children: [
            {
                key: '5',
                label: 'Create',
                pathname: "/employee/dashboard/workorder/have",
            }
        ]
    },
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
    }

]

export function getSideBarMenuItems(router: AppRouterInstance, sideBarMenuItems: TsideBarMenuItems[], dashBoardIcons: any,)
    : MenuProps["items"] {

    return sideBarMenuItems.map((item) => {
        let children = item.children ? getSideBarMenuItems(router, item.children, dashBoardIcons) : undefined
        return {
            ...item,
            children,
            icon: dashBoardIcons[item.label.replace(/\s/g, '')],
            onClick: () => {
                if (item.pathname) {
                    router.push(item.pathname)
                }
            }
        }
    })
}

const findRecursive = (sideBarMenuItems: TsideBarMenuItems[], pathname: string): TsideBarMenuItems | null => {

    for (const item of sideBarMenuItems) {
        if (item.pathname && item.pathname === pathname) {
            return item;
        }
        else if (item.children) {
            const required_item = findRecursive(item.children, pathname);
            if (required_item) return required_item;
        }
    }

    return null;
}


export function getActiveSideBarMenu(pathname: string): string {
    const active_menu = findRecursive(sideBarMenuItems, pathname);
    if (!active_menu) return "1";
    return active_menu.key
}