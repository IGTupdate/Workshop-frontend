"use client";
import React, { useCallback, useEffect, useState } from "react";
import GetColumnTextSearchProps from "@/app/components/TableSearch/GetColumnTextSearchProps";
import {
  Button,
  Flex,
  Radio,
  RadioChangeEvent,
  Space,
  TableProps,
  Typography,
} from "antd";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterDropdownProps } from "antd/es/table/interface";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";
import { IoIosEye } from "react-icons/io";
import {
  TEmployeeStatus,
  TEmployeeTableDataType,
  TRole,
} from "@/app/types/employee";
// import { employeeStatusText } from "../__utils/employeeStatusText";
import { FaUserPen } from "react-icons/fa6";
import { getAllEmployeeRole } from "@/app/services/operations/employee/employee";
import { TServicePlans } from "@/app/types/service";

const { Title, Text } = Typography;

interface TempOpton {
  value: string;
  text: string;
}

export function ServicePlansTableContainer() {
 

  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      if (!value || value === "")
        return removeQueryParams(searchParams.toString(), name);
      else return setQueryParams(searchParams.toString(), name, value);
    },
    [searchParams],
  );

  // select status
  const handleStatusSelect = (
    e: RadioChangeEvent,
    props: FilterDropdownProps,
  ) => {
    const queryParmas = createQueryString(
      e.target.name || "role",
      e.target.value,
    );
    router.push(`${pathname}?${queryParmas}`);
    props.close();
  };

  // reset status
  const handleStatusReset = () => {
    const queryParmas = createQueryString("role");
    router.push(`${pathname}?${queryParmas}`);
  };

  const column_service_plans_table: TableProps<TServicePlans>["columns"] =
    [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        // ...GetColumnTextSearchProps<TEmployeeTableDataType>("name"),
        render: (name) => {
          return <div className="font-semibold">{name}</div>;
        },
      },
      {
        title: "Vehicle Type",
        dataIndex: "vehicle_type",
        key: "vehicle_type",
        // ...GetColumnTextSearchProps<TEmployeeTableDataType>("vehicle_type"),
        render: (vehicle_type) => {
          return <div className="uppercase">{vehicle_type}</div>;
        },
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        // ...GetColumnTextSearchProps<TEmployeeTableDataType>("category"),
        render: (category) => {
          return <div>{category.name}</div>;
        },
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        // ...GetColumnTextSearchProps<TEmployeeTableDataType>("category"),
        render: (price) => {
          return <div>$ {price}</div>;
        },
      },

      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        // defaultSortOrder: "descend",
        render: (duration) => {
          return <div>{duration} Hrs</div>
        },
      },
      {
        title: "Actions",
        dataIndex: "action",
        key: "action",
        render: (_, { _id }) => {
          return (
            <Flex align="center" wrap="wrap" gap="small">
              <div
                onClick={() => {
                  router.push("/employee/dashboard/employee/" + _id);
                }}
                style={{ color: "#1890ff" }}
                className="cursor-pointer"
              >
                <IoIosEye size={"22px"} title="Employee Details" />
              </div>

              <div
                onClick={() => {
                  router.push(
                    "/employee/dashboard/employee/" + _id + "/update",
                  );
                }}
                style={{ color: "#1890ff" }}
                className="cursor-pointer"
              >
                <FaUserPen size={"22px"} title="Update Employee" />
              </div>
            </Flex>
          );
        },
      },
    ];
  return column_service_plans_table;
}
