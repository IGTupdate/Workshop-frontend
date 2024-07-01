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
import { FaEdit } from "react-icons/fa";
import { getAllEmployeeRole } from "@/app/services/operations/employee/employee";
import { employeeStatusText } from "../../employee/__utils/employeeStatusText";
import { Tool } from "@/app/types/tool";

const { Title, Text } = Typography;

interface TempOpton {
  value: string;
  text: string;
}

export function ToolColumns() {
  const [employeeRoleOption, setEmployeeRoleOption] = useState<TempOpton[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await getAllEmployeeRole();
        const employeeRoles = response.data as TRole[];
        const options = employeeRoles.map((role: TRole) => ({
          // Corrected mapping function
          value: role.role,
          text: role.role,
        }));
        setEmployeeRoleOption(options);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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

  const column_tool_data_table: TableProps<Tool>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // ...GetColumnTextSearchProps<TEmployeeTableDataType>("name"),
      render: (name) => {
        return <div className="font-semibold capitalize">{name}</div>;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      // ...GetColumnTextSearchProps<TEmployeeTableDataType>("contactNumber"),
      render: (category) => {
        return <p className="capitalize">{category.name}</p>;
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      // ...GetColumnTextSearchProps<TEmployeeTableDataType>("email"),
      render: (location) => {
        return <p className="capitalize">{location}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "initialStatus",
      key: "initialStatus",
      // ...GetColumnTextSearchProps<TEmployeeTableDataType>("email"),
      render: (initialStatus) => {
        return <p className="capitalize">{initialStatus}</p>;
      },
    },

    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, { tId }) => {
        return (
          <Flex align="center" wrap="wrap" gap="small">
            {/* <div
                                onClick={() => {
                                    // router.push("/employee/dashboard/employee/" + tId);
                                }}
                                style={{ color: "#1890ff" }}
                                className="cursor-pointer"
                            >
                                <IoIosEye size={"22px"} title="Employee Details" />
                            </div> */}

            <div
              onClick={() => {
                // router.push(
                //     "/employee/dashboard/employee/" + tId + "/update",
                // );
              }}
              style={{ color: "#1890ff" }}
              className="cursor-pointer"
            >
              <FaEdit size={"18px"} title="Update Employee" />
            </div>
          </Flex>
        );
      },
    },
  ];
  return column_tool_data_table;
}
