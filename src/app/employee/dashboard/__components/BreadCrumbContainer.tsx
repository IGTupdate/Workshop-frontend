"use client";

import { Breadcrumb } from 'antd'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { findRecursiveByPathNameExact, sideBarMenuItems } from '../utils/sideBarMenuItems';

type Props = {}

const BreadCrumbContainer = (props: Props) => {
    const pathname = usePathname();

    const [breadcrumbItem, setBreadCrumItem] = useState([
        {
            title: "Home",
            href: "/employee/dashboard"
        }
    ])

    useEffect(() => {
        getAllNestedPath(pathname + "/");
    }, [pathname]);

    const getAllNestedPath = (path: string) => {

        let newBreadCrumItem = []

        for (let index = 0; index < path.length; index++) {
            if (path.charAt(index) === '/') {
                const currentPath = path.substring(0, index);
                // console.log(currentPath);
                const requiredSubMenuItem = findRecursiveByPathNameExact(sideBarMenuItems, currentPath);
                if (requiredSubMenuItem) {
                    newBreadCrumItem.push({
                        title: requiredSubMenuItem.label,
                        href: requiredSubMenuItem.pathname || ""
                    })
                }
                // else {
                //     newBreadCrumItem.push({
                //         title: currentPath,
                //         href: currentPath
                //     })
                // }
            }
        }

        setBreadCrumItem(newBreadCrumItem);

    }
    return (
        <div className='p-4'>
            <div>
                <Breadcrumb
                    separator=">"
                    items={breadcrumbItem}
                    className='font-semibold text-black'
                />
            </div>
        </div>
    )
}

export default BreadCrumbContainer