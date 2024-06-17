"use client";

import { TSlot } from "@/app/types/calender";
import { TASlot, TAvailbleSlots } from "@/app/types/slot";
import { TSlotDetail } from "@/app/types/slot-schedule";
import { setQueryParams } from "@/app/utils/helper";
import { Button, Space, Table, TableProps, Tag, Typography } from "antd";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const { Title, Text } = Typography;

type Props = {
  availableSlot: TAvailbleSlots | null;
};

const ShowSlotAvailableData = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("ShowSlotAvailableData");

  const [talbeRows, setTableRows] = useState<any>([]);
  useEffect(() => {
    setTableRows(() => {
      return props.availableSlot?.available_slots.map((el, index) => {
        return {
          ...el,
          key: index,
        };
      });
    });
  }, [props.availableSlot]);

  const handleProceedClick = (slot_id: string, calender_id: string) => {
    let queryParams = setQueryParams(
      searchParams.toString(),
      "slot_id",
      slot_id,
    );
    queryParams = setQueryParams(queryParams, "calender_id", calender_id);
    router.push(`${pathname}?${queryParams}`);
  };

  const columns: TableProps<TASlot>["columns"] = [
    {
      title: t("startTime"),
      dataIndex: "start_time",
      key: "start_time",
      render: (text) => {
        return new Date(text).toLocaleTimeString();
      },
    },
    {
      title: t("endTime"),
      dataIndex: "end_time",
      key: "end_time",
      render: (text) => {
        return new Date(text).toLocaleTimeString();
      },
    },
    {
      title: t("available"),
      key: "slot_limit",
      dataIndex: "slot_limit",
      render: (_, { available }) => (
        <>
          <Tag
            color={available > 4 ? "green" : available === 0 ? "red" : "orange"}
            key={available}
          >
            {available}
          </Tag>
        </>
      ),
    },
    {
      title: t("action"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            disabled={record.available === 0}
            onClick={() => {
              handleProceedClick(
                record._id,
                props.availableSlot?.calender_id || "",
              );
              // router.push(`?calender_id=${props.availableSlot?.calender_id}&slot_id=${record._id}`)
            }}
            type="primary"
          >
            {t("button")}
          </Button>
        </Space>
      ),
    },
  ];

  return props.availableSlot ? (
    <div>
      <Text strong>
        {t("date")} : {new Date(props.availableSlot.date).toDateString()}
      </Text>
      <Table
        scroll={{ x: 500 }}
        pagination={false}
        className="mt-4"
        columns={columns}
        dataSource={talbeRows}
      />
    </div>
  ) : (
    ""
  );
};

export default ShowSlotAvailableData;
