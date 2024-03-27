"use client";

import { Divider, Switch, Typography } from "antd";
import { CiCalendarDate } from "react-icons/ci";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import React from "react";
import { TCalender } from "@/app/types/calender";
import DescriptionItem from "@/app/components/DescriptionItem.tsx";
const { Title, Text } = Typography;

type Props = {
  activeCalender: TCalender;
};


const CalenderShowDetail = (props: Props) => {
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
            defaultChecked={false}
          />
        </div>
      </div>
      <div>
        <Title level={5}>Slot Details</Title>

        <div>
          <ul>
            <li>
              <div>
                <DescriptionItem title="Start Time" content="Thu Mar 21 2024"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalenderShowDetail;
