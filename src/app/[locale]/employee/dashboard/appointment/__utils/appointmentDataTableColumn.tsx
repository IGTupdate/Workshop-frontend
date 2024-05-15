"use client";

import React, { useCallback } from "react";
// import GetColumnTextSearchProps from "@/app/components/TableSearch/getColumnTextSearchProps";
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
import { IoIosEye } from "react-icons/io";

import { MdAddChart } from "react-icons/md";
import dayjs from "dayjs";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { useTranslations } from "next-intl";

const { Title, Text } = Typography;

export function GetAppointmentDataTableColumn() {
  const router = useRouter();

  const ability = useAbility();

  const t = useTranslations("EmployeeDashboardAppointmentPage");

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
      e.target.name || "status",
      e.target.value,
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
        title: t("name"),
        dataIndex: "name",
        key: "name",
        ...GetColumnTextSearchProps<TAppointmentDataTable>("name"),
        render: (name) => {
          return <p className="capitalize font-semibold">{name}</p>;
        },
      },
      {
        title: t("phone"),
        dataIndex: "phone",
        key: "phone",
        ...GetColumnTextSearchProps<TAppointmentDataTable>("phone"),
      },
      {
        title: t("vehile_registeration_number"),
        dataIndex: "registeration_number",
        key: "registeration_number",
        ...GetColumnTextSearchProps<TAppointmentDataTable>(
          "registeration_number",
        ),

        render: (register) => {
          return <p className="uppercase">{register}</p>;
        },
      },
      {
        title: t("date_time"),
        dataIndex: "date_time",
        key: "date_time",
        defaultSortOrder: "descend",
        // sorter: (a, b) => a.date_time.getTime() - b.date_time.getTime(),
        render: (value) => {
          return (
            <div className="flex flex-wrap items-center gap-3">
              <Text>{dayjs(value).format("DD/MMM/YYYY")}</Text>

              <Text>{dayjs(value).format("h:mm A")}</Text>
            </div>
          );
        },
      },
      {
        title: t("status"),
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
        title: t("action"),
        dataIndex: "action",
        key: "action",
        render: (_, { _id, status }) => {
          return (
            <Flex wrap="wrap" gap="small" align="center">
              {/* view appointments */}
              <div
                onClick={() => {
                  router.push("/employee/dashboard/appointment/" + _id);
                }}
                style={{ color: "#1890ff" }}
                className="cursor-pointer"
              >
                <IoIosEye size={"22px"} title="View Appointments" />
              </div>

              {/* create workorder */}
              {ability &&
                ability.can(casl_action.create, casl_subject.appointment) &&
                status === appointmentStatus[0] && (
                  <div
                    onClick={() => {
                      router.push(
                        "/employee/dashboard/workorder/create?appointmentId=" +
                          _id,
                      );
                    }}
                    style={{ color: "#24ae55" }}
                    className="cursor-pointer"
                  >
                    <MdAddChart size={"22px"} title="Create WorkOrder" />
                  </div>
                )}
            </Flex>
          );
        },
      },
    ];
  return column_appointment_data_table;
}
