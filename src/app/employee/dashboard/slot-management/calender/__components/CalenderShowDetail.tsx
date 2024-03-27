import { useAppSelector } from "@/app/store/reduxHooks";
import { Typography } from "antd";
import { CiCalendarDate } from "react-icons/ci";

import React from "react";
import { TCalender } from "@/app/types/calender";
import { calenderCellBgColorByStatus } from "../__utils.ts/constant";
const { Title, Text } = Typography;

type Props = {
  activeCalender: TCalender;
};

const CalenderShowDetail = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
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
        <div
          className={`py-2 px-4 text-white rounded ${
            calenderCellBgColorByStatus[props.activeCalender.status]
          }`}
        >
          Open
        </div>
      </div>
    </div>
  );
};

export default CalenderShowDetail;
