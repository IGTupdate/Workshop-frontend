'use client';
import { TsideBarMenuItems } from "@/app/employee/dashboard/utils/sideBarMenuItems";


export const CustomerSideBarMenuItems: TsideBarMenuItems[] = [
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
        label: "Notifications",
        pathname: '/dashboard/notifications'
    },
    {
        key: '9',
        label: "Settings",
        pathname: '/dashboard/settings'
    }

];