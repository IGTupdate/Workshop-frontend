"use client";

import { TCalender } from "@/app/types/calender";
import { Button, Modal, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { calender_status } from "../__utils.ts/constant";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  setActiveCalender,
  setCalenderLoading,
} from "@/app/store/slices/calenderSlice";
import { useAppDispatch } from "@/app/store/reduxHooks";

const { Title, Text } = Typography;

type Props = {
  calender: TCalender | null;
  setOpenUpdateStatusModal: React.Dispatch<
    React.SetStateAction<TCalender | null>
  >;
};

const CalenderUpdateStatus = (props: Props) => {
  console.log(props.calender);
  const dispatch = useAppDispatch();

  const [spinLoading, setSpinLoading] = useState(false);

  const handleOk = () => {
    // for now testing neeed to call api
    props.setOpenUpdateStatusModal(null);
    dispatch(
      setActiveCalender({
        ...props.calender,
        status: props.calender?.status === "Open" ? "Close" : "Open",
      })
    );
  };

  const handleCancel = () => {
    props.setOpenUpdateStatusModal(null);
  };

  useEffect(() => {
    if (props.calender && props.calender.status === calender_status.open) {
      setSpinLoading(true);

      //   this is for the test purpose
      setTimeout(() => {
        setSpinLoading(false);
      }, 3000);
      // call api for the number of appointments
    }
  }, [props.calender]);
  return (
    <div>
      <Modal
        open={props.calender !== null}
        title={<Title level={4}>Confirm</Title>}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              onClick={handleOk}
              className="bg-blue1 text-white1 font-medium text-md"
            >
              Confirm
            </Button>
          </>
        )}
      >
        <Spin spinning={spinLoading} delay={500}>
          {props.calender ? (
            <div>
              <Text className="text-lg mb-1">
                Are You Sure Want to
                <span className="font-semibold">
                  {props.calender.status === calender_status.open
                    ? " Close"
                    : " Open"}
                </span>{" "}
                Slots for
                {new Date(props.calender.date).toDateString()} ?
              </Text>
              {props.calender.status === calender_status.open && (
                <div>
                  <Text>5 Scheduled appointments will be cancelled</Text>
                  <br />
                  <Link
                    href={"/employee/dashboard/appointment"}
                    className="text-blue1 flex items-start mt-2"
                  >
                    View Appointments
                    <MdOutlineKeyboardArrowRight className="w-6 h-6" />
                  </Link>
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
