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
import { useTranslations } from "next-intl";

const { Title, Text } = Typography;

type Props = {};

const CalenderUpdateStatus = (props: Props) => {
  const dispatch = useAppDispatch();
  const [appponitementData, setAppointmentData] = useState<null | number>(null);
  const { updateCalenderLoading, updateStatusCalender } = useAppSelector(
    (state) => state.calender,
  );

  const t = useTranslations("EmployeeDashboardCalenderPage");

  const getAppointmentScheduledData = async () => {
    try {
      if (
        updateStatusCalender &&
        updateStatusCalender.status === calender_status.open
      ) {
        const appointment = await getAppointmentByCalenderId(
          updateStatusCalender._id,
          "status=Scheduled",
        );
        setAppointmentData(appointment);
      } else {
        setAppointmentData(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAppointmentScheduledData();
  }, [updateStatusCalender]);

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
        title={<Title level={4}>{t("confirm")}</Title>}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              disabled={updateCalenderLoading}
              onClick={handleOk}
              className="bg-blue1 text-white1 font-medium text-md"
            >
              {t("confirm")}
            </Button>
          </>
        )}
      >
        <Spin spinning={appponitementData === null} delay={500}>
          {updateStatusCalender ? (
            <div>
              <Text className="text-md mb-1">
                {t("are_you_sure")}
                <span className="font-semibold">
                  {updateStatusCalender.status === calender_status.open
                    ? " Close"
                    : " Open"}
                </span>{" "}
                {t("slots_for")}
                {new Date(updateStatusCalender.date).toDateString()} ?
              </Text>
              {updateStatusCalender.status === calender_status.open && (
                <div>
                  {appponitementData && appponitementData > 0 ? (
                    <div>
                      <Text type="danger" style={{ fontSize: "12px" }}>
                        {appponitementData}{" "}
                        {t("scheduled_appointment_will_be_cancelled")}
                      </Text>
                      <br />
                      <Link
                        href={`/employee/dashboard/appointment?calender_id=${updateStatusCalender._id}`}
                        className="text-blue1 text-[12px] flex items-start"
                      >
                        {t("view_appointments")}
                        <MdOutlineKeyboardArrowRight className="w-6 h-6" />
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          ) : (
            <Text>{t("no_calender_selected")}</Text>
          )}
        </Spin>
      </Modal>
    </div>
  );
};

export default CalenderUpdateStatus;
