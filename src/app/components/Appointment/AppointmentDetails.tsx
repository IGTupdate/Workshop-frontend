import Notifications from "@/app/dashboard/notifications/__components/Notifications";
import { useAppSelector } from "@/app/store/reduxHooks";
import {
  convertToLocaleDateAndWeekday,
  formatDateAndTime,
} from "@/app/utils/dateFormatter";
import { Descriptions, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  appointmentData: any;
  bordered?: boolean;
  notificationData?: any;
}

const AppointmentDetails: React.FC<Props> = ({
  appointmentData,
  notificationData,
  bordered,
}) => {
  const { isSmallDevice } = useAppSelector((state) => state.device);
  const pathname = usePathname();

  return (
    <>
      <div className="bg-white shadow-xl rounded-xl overflow-hidden mb-8">
        <Descriptions
          title={`Appointment Id: ${appointmentData._id}`}
          column={isSmallDevice === 1 ? 1 : 2}
          bordered={bordered}
          className="p-4 "
        >
          <Descriptions.Item label="Appointment Date">
            {convertToLocaleDateAndWeekday(appointmentData.calender_id.date)}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {formatDateAndTime(appointmentData.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Start Time">
            {dayjs(appointmentData.calender_id.slots[0].start_time).format(
              "hh:mm"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="End Time">
            {dayjs(appointmentData.calender_id.slots[0].end_time).format(
              "hh:mm"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Owner">
            {appointmentData.vehicle_id.owner}
          </Descriptions.Item>
          <Descriptions.Item label="Registration Number">
            {appointmentData.vehicle_id.registeration_number}
          </Descriptions.Item>
          <Descriptions.Item label="VIN">
            {appointmentData.vehicle_id.vin}
          </Descriptions.Item>
          <Descriptions.Item label="Vehicle Make">
            {appointmentData.vehicle_id.vehicle_make}
          </Descriptions.Item>
          <Descriptions.Item label="Vehicle Model">
            {appointmentData.vehicle_id.vehicle_model}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag
              color={appointmentData.status === "Cancelled" ? "red" : "green"}
            >
              {appointmentData.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Remarks">
            <div>
              {appointmentData.service_description.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>

      {pathname.split("/")[3] !== "reschedule" && (
        <Notifications show={"all"} notificationData={notificationData} />
      )}
    </>
  );
};

export default AppointmentDetails;
