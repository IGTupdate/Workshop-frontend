"use client";
import React, { useCallback } from "react";
import GetColumnTextSearchProps from "@/app/components/TableSearch/GetColumnTextSearchProps";
import {
    Flex,
    RadioChangeEvent,
    TableProps,
    Typography,
} from "antd";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterDropdownProps } from "antd/es/table/interface";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";
import { IoIosEye } from "react-icons/io";
import { TEmployeeStatus, TEmployeeTableDataType } from "@/app/types/employee";
import { employeeStatusText } from "../__utils/employeeStatusText";

const { Title, Text } = Typography;

export function EmployeeTableColumns() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value?: string) => {
            if (!value || value === "")
                return removeQueryParams(searchParams.toString(), name);
            else return setQueryParams(searchParams.toString(), name, value);
        },
        [searchParams]
    );

    // select status
    const handleStatusSelect = (
        e: RadioChangeEvent,
        props: FilterDropdownProps
    ) => {
        const queryParmas = createQueryString(
            e.target.name || "status",
            e.target.value
        );
        router.push(`${pathname}?${queryParmas}`);
        props.close();
    };

    // reset status
    const handleStatusReset = () => {
        const queryParmas = createQueryString("status");
        router.push(`${pathname}?${queryParmas}`);
    };

    const column_employeee_data_table: TableProps<TEmployeeTableDataType>["columns"] =
        [
            {
                title: "Name",
                dataIndex: "fullName",
                key: "fullName",
                // ...GetColumnTextSearchProps<TEmployeeTableDataType>("name"),
                render: (fullName) => {
                    return (
                        <div className="font-semibold">
                            {fullName}
                        </div>
                    );
                },
            },
            {
                title: "Contact Number",
                dataIndex: "contactNumber",
                key: "contactNumber",
                ...GetColumnTextSearchProps<TEmployeeTableDataType>(
                    "contactNumber"
                ),
                render: (contactNumber) => {
                    return <p className="uppercase">{contactNumber}</p>;
                }
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                ...GetColumnTextSearchProps<TEmployeeTableDataType>(
                    "email"
                ),
                render: (value) => {
                    return (
                        <p>{value}</p>
                    );
                },
            },
            {
                title: "Role",
                dataIndex: "role",
                key: "role",
                defaultSortOrder: "descend",
                render: (value) => {
                    return (
                        <p className="uppercase">{value}</p>
                    );
                },
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                defaultSortOrder: "descend",
                render: (value) => {
                    return (
                        employeeStatusText[value as TEmployeeStatus]
                    );
                },
            },
            // {
            //     title: "Status",
            //     dataIndex: "status",
            //     key: "status",
            //     filters: getWorkOrderStatus(),
            //     filterDropdown: (props) => {
            //         return (
            //             <div className="p-4">
            //                 <Radio.Group
            //                     defaultValue={searchParams.get("status")}
            //                     onChange={(e) => {
            //                         handleStatusSelect(e, props);
            //                     }}
            //                 >
            //                     <Space direction="vertical">
            //                         {props.filters &&
            //                             props.filters.map((el, index) => {
            //                                 return (
            //                                     <Radio
            //                                         key={index}
            //                                         name={"status"}
            //                                         value={el.value}
            //                                         onChange={(e) => {
            //                                             handleStatusSelect(e, props);
            //                                         }}
            //                                     >
            //                                         {el.text}
            //                                     </Radio>
            //                                 );
            //                             })}
            //                     </Space>
            //                 </Radio.Group>
            //                 <div>
            //                     <Button
            //                         onClick={() => props && handleStatusReset()}
            //                         size="small"
            //                         style={{ width: 90, marginTop: "10px" }}
            //                     >
            //                         Reset
            //                     </Button>
            //                 </div>
            //             </div>
            //         );
            //     },
            //     render: (text: TAppointmentStatus) => {
            //         return (
            //             <div className="text-md font-semibold">
            //                 {/* {workOrderStatusText[text]} */}
            //                 {appointmentStatusText[text]}
            //             </div>
            //         );
            //     },
            // },
            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                render: (_, { _id }) => {
                    return (
                        <Flex wrap="wrap" gap="small">
                            <div
                                onClick={() => {
                                    router.push("/employee/dashboard/employee/" + _id);
                                }}
                                style={{ color: "#1890ff" }}
                                className="cursor-pointer"
                            ><IoIosEye size={"22px"} title="View Appointments" /></div>
                        </Flex>
                    );
                },
            },
        ];
    return column_employeee_data_table;
}
