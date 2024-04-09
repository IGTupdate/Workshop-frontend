'use client'
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
        pathname: "/dashboard"
    },
    {
        key: '2',
        label: 'Profile',
        pathname: '/dashboard/profile'
    },
    {
        key: '3',
        label: 'Appointment',
        children: [
            {
                key: '4',
                label: 'Book',
                pathname: "/dashboard/appointment/book",
            },
            {
                key: '5',
                label: 'Reschedule',
                pathname: "/dashboard/appointment/reschedule",
            },
            {
                key: '6',
                label: 'Cancel',
                pathname: '/dashboard/appointment/cancel'
            }
        ]
    },
    {
        key: '7',
        label: 'Previous Bookings',
        pathname: '/dashboard/previous-appointments'
    },
    {
        key: '8',
        label: "Settings",
        pathname: '/dashboard/settings'
    }

]

export function getSideBarMenuItems(router: AppRouterInstance, sideBarMenuItems: TsideBarMenuItems[], dashBoardIcons: any)
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
                    // if(isSmallDevice) setCollapsed(true)
                }
            }
        }
    })
}

export const findRecursiveByPathName = (sideBarMenuItems: TsideBarMenuItems[], pathname: string): TsideBarMenuItems | null => {

    for (const item of sideBarMenuItems) {
        if (item.pathname && pathname.includes(item.pathname)) {
            return item;
        }
        else if (item.children) {
            const required_item = findRecursiveByPathName(item.children, pathname);
            if (required_item) return required_item;
        }
    }

    return null;
}


export function getActiveSideBarMenu(pathname: string): string {
    const active_menu = findRecursiveByPathName(sideBarMenuItems, pathname);
    if (!active_menu) return "1";
    return active_menu.key
}