"use client";
import React, { useCallback } from "react";
import GetColumnTextSearchProps from "../../../../components/TableSearch/GetColumnTextSearchProps";
import {
  Button,
  Flex,
  Radio,
  RadioChangeEvent,
  Space,
  TableProps,
  Typography,
} from "antd";
import {
  appointmentStatus,
  appointmentStatusText,
  getAppointMentStatus,
} from "./appointmentStatus";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterDropdownProps } from "antd/es/table/interface";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";
import {
  TAppointmentDataTable,
  TAppointmentStatus,
} from "@/app/types/appointment";
import { FaEye } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";

const { Title, Text } = Typography;

export function GetAppointmentDataTableColumn() {
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

  const column_appointment_data_table: TableProps<TAppointmentDataTable>["columns"] =
    [
      {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
        ...GetColumnTextSearchProps<TAppointmentDataTable>("phone"),
        render: (customer) => {
          return (
            <div>
              <Title level={5}>{customer.name}</Title>
              <Text>{customer.phone}</Text>
            </div>
          );
        },
      },
      {
        title: "Vehicle Reg No.",
        dataIndex: "registeration_number",
        key: "registeration_number",
        ...GetColumnTextSearchProps<TAppointmentDataTable>(
          "registeration_number"
        ),
      },
      {
        title: "Date & Time",
        dataIndex: "date_time",
        key: "date_time",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.date_time.getTime() - b.date_time.getTime(),
        render: (value) => {
          return (
            <div>
              <Text>{value.toLocaleDateString()}</Text>
              <br />
              <Text>{new Date(value).toLocaleTimeString()}</Text>
            </div>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: getAppointMentStatus(),
        filterDropdown: (props) => {
          return (
            <div className="p-4">
              <Radio.Group
                defaultValue={searchParams.get("status")}
                onChange={(e) => {
                  handleStatusSelect(e, props);
                }}
              >
                <Space direction="vertical">
                  {props.filters &&
                    props.filters.map((el, index) => {
                      return (
                        <Radio
                          key={index}
                          name={"status"}
                          value={el.value}
                          onChange={(e) => {
                            handleStatusSelect(e, props);
                          }}
                        >
                          {el.text}
                        </Radio>
                      );
                    })}
                </Space>
              </Radio.Group>
              <div>
                <Button
                  onClick={() => props && handleStatusReset()}
                  size="small"
                  style={{ width: 90, marginTop: "10px" }}
                >
                  Reset
                </Button>
              </div>
            </div>
          );
        },
        render: (text: TAppointmentStatus) => {
          return (
            <div className="text-md font-semibold">
              {appointmentStatusText[text]}
            </div>
          );
        },
      },
      {
        title: "Actions",
        dataIndex: "action",
        key: "action",
        render: (_, { _id }) => {
          return (
            <Flex wrap="wrap" gap="small">

              <Button
                onClick={() => {
                  router.push("/employee/dashboard/appointment/" + _id)
                }}
                style={{ border: "1px #1890ff solid", color: "#1890ff" }}
                size="middle"
                icon={<FaEye size={"22px"} title="View Appointments" />}
              ></Button>

              {/* view appointments */}
              <Button
                style={{ border: "1px #24ae55 solid", color: "#24ae55" }}
                size="middle"
                icon={<MdAddChart size={"22px"} title="Create WorkOrder" />}
              ></Button>
            </Flex>
          );
        },
      },
    ];
  return column_appointment_data_table;
}
