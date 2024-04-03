"use client";

import { Button, Divider, Modal, Switch, Typography } from "antd";
import { CiCalendarDate } from "react-icons/ci";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { TCalender } from "@/app/types/calender";
import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import { calender_status } from "../__utils/constant";
import CalenderUpdateStatus from "./CalenderUpdateStatus";
const { Title, Text } = Typography;

type Props = {
  activeCalender: TCalender;
};

const CalenderShowDetail = (props: Props) => {
  const [openUpdateStatusModal, setOpenUpdateStatusModal] =
    useState<TCalender | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex justify-start items-start gap-2">
            <CiCalendarDate className="w-6 h-6 m-0" />
            <Title level={5} className=" mb-0">
              Date
            </Title>
          </div>
          <Text className="text-md font-medium">
            {new Date(props.activeCalender.date).toDateString()}
          </Text>
        </div>
        <div>
          <Switch
            className="bg-[rgba(0,0,0,0.45)]"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={
              props.activeCalender.status === calender_status.open
            }
            checked={props.activeCalender.status === calender_status.open}
            onChange={() => {
              setOpenUpdateStatusModal(props.activeCalender);
            }}
          />
        </div>
      </div>
      <Divider />
      {props.activeCalender &&
        props.activeCalender.status === calender_status.open ? (
        <div>
          <Title level={5}>Slot Details</Title>
          <div>
            <ul className="list-disc">
              {props.activeCalender.slots.map((slot, index) => {
                return (
                  <li key={slot._id}>
                    <div className="grid grid-cols-2 gap-x-2 items-end">
                      <DescriptionItem
                        title="Start Time"
                        content={new Date(slot.start_time).toLocaleTimeString()}
                      />
                      <DescriptionItem
                        title="End Time"
                        content={new Date(slot.end_time).toLocaleTimeString()}
                      />
                      <DescriptionItem
                        title="Slot Limit"
                        content={slot.slot_limit}
                      />
                      <div>
                        <button className="p-2 border bg-gray-50 hover:bg-gray-100 rounded-full w-10 h-10">
                          <EditOutlined />
                        </button>
                      </div>
                    </div>
                    <Divider />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <Text>Details Not Available for Close Calender</Text>
      )}

      {/* modal delete  */}
      <CalenderUpdateStatus
        calender={openUpdateStatusModal}
        setOpenUpdateStatusModal={setOpenUpdateStatusModal}
      />
    </div>
  );
};

export default CalenderShowDetail;
