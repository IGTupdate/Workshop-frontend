"use client";

import { TCalender, TCalenderStatus } from "@/app/types/calender";
import { Button, Modal, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { calender_status } from "../__utils/constant";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  setUpdateCalenderLoading,
  setUpdateStatusCalender,
} from "@/app/store/slices/calenderSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { getAppointmentByCalenderId } from "@/app/services/operations/appointment/appointment";
import { udpateCalenderStatus } from "@/app/services/operations/appointment/calender";
import { toogleCalenderStatus } from "../__utils/helper";

const { Title, Text } = Typography;

type Props = {

};

const CalenderUpdateStatus = (props: Props) => {

  const dispatch = useAppDispatch();
  const [appponitementData, setAppointmentData] = useState<null | number>(null);
  const { updateCalenderLoading, updateStatusCalender } = useAppSelector((state) => state.calender)

  const getAppointmentScheduledData = async () => {
    if (updateStatusCalender && updateStatusCalender.status === calender_status.open) {
      const appointment = await getAppointmentByCalenderId(updateStatusCalender._id);
      setAppointmentData(appointment)
    }
    else {
      setAppointmentData(0);
    }
  }

  useEffect(() => {
    getAppointmentScheduledData();
  }, [updateStatusCalender])

  const handleOk = () => {
    if (!updateStatusCalender) return;
    dispatch(setUpdateCalenderLoading(true));
    const changeStatusTo = toogleCalenderStatus(updateStatusCalender.status);
    dispatch(udpateCalenderStatus(updateStatusCalender._id, changeStatusTo));
    // props.setOpenUpdateStatusModal(null);

  };

  const handleCancel = () => {
    if (!updateCalenderLoading) {
      dispatch(setUpdateStatusCalender(null));
    }
  };


  return (
    <div>
      <Modal
        open={updateStatusCalender !== null}
        title={<Title level={4}>Confirm</Title>}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              disabled={updateCalenderLoading}
              onClick={handleOk}
              className="bg-blue1 text-white1 font-medium text-md"
            >
              Confirm
            </Button>
          </>
        )}
      >
        <Spin spinning={appponitementData === null} delay={500}>
          {updateStatusCalender ? (
            <div>
              <Text className="text-md mb-1">
                Are You Sure Want to
                <span className="font-semibold">
                  {updateStatusCalender.status === calender_status.open
                    ? " Close"
                    : " Open"}
                </span>{" "}
                Slots for
                {new Date(updateStatusCalender.date).toDateString()} ?
              </Text>
              {updateStatusCalender.status === calender_status.open && (
                <div>
                  {
                    (appponitementData && appponitementData > 0) ?
                      <div>
                        <Text type="danger" style={{ fontSize: "12px" }}>{appponitementData} Scheduled appointments will be cancelled</Text>
                        <br />
                        <Link
                          href={`/employee/dashboard/appointment?calenderId=${updateStatusCalender._id}`}
                          className="text-blue1 text-[12px] flex items-start"
                        >
                          View Appointments
                          <MdOutlineKeyboardArrowRight className="w-6 h-6" />
                        </Link>
                      </div> : ""
                  }

                </div>
              )}
            </div>
          ) : (
            <Text>No Calender Selected</Text>
          )}
        </Spin>
      </Modal>
    </div>
  );
};

export default CalenderUpdateStatus;
