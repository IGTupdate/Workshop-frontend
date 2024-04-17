"use client"

import Loader from '@/app/components/Loader';
import { TWorkOrderData } from '@/app/types/work-order';
import { removeQueryParams, setQueryParams } from '@/app/utils/helper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import WorkOrderTableContainer from './WorkOrderTableContainer';

type Props = {}

const WorkOrderPageContainer = (props: Props) => {
    const [workOrderLoading, setWorkOrderLoading] = useState(false);
    const [workOrderData, setWorkOrderData] = useState<TWorkOrderData>({
        workOrders: [],
        totalWorkOrders: 0
    })

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // create query string
    const createQueryString = useCallback(
        (name: string, value?: string) => {
            if (!value || value === "")
                return removeQueryParams(searchParams.toString(), name);
            else return setQueryParams(searchParams.toString(), name, value);
        },
        [searchParams]
    );

    // get current page
    const getCurrentPage = useCallback(() => {
        return Number(searchParams.get("page")) || 1;
    }, [searchParams]);

    // handle page change
    const handlePageChange = (value: number) => {
        const queryParmas = createQueryString("page", String(value));
        router.push(`${pathname}?${queryParmas}`);
    };

    return (
        <div>
            {
                workOrderLoading ? <Loader /> : <div>
                    <WorkOrderTableContainer />
                </div>
            }
        </div>
    )
}

export default WorkOrderPageContainer;