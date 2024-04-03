"use client";

import { Drawer, Typography } from "antd";
import React from "react";
import CalenderShowDetail from "./CalenderShowDetail";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setActiveCalender } from "@/app/store/slices/calenderSlice";
import { TCalender } from "@/app/types/calender";
import CalenderCreate from "./CalenderCreate";

const { Text } = Typography;

type Props = {};

const CalenderManageDrawer = (props: Props) => {
  // dispatch event
  const dispatch = useAppDispatch();

  // calender state
  const { activeCalender, calenderDrawerLoading } = useAppSelector((state) => {
    return state.calender;
  });

  const closeDrawer = () => {
    if (!calenderDrawerLoading) {
      dispatch(setActiveCalender(null));
      console.log("closing drawer");
    }
  };

  return (
    <div>
      <Drawer
        title={
          <Text>
            Manage Date :{" "}
            {activeCalender?.date
              ? new Date(activeCalender?.date).toDateString()
              : "-"}{" "}
          </Text>
        }
        width={480}
        onClose={closeDrawer}
        open={activeCalender !== null}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {activeCalender ? (
          <div>
            {!activeCalender._id ? (
              <CalenderCreate activeCalender={activeCalender} />
            ) : (
              <CalenderShowDetail
                activeCalender={activeCalender as TCalender}
              />
            )}
          </div>
        ) : (
          <Text>No Date Selected</Text>
        )}
      </Drawer>
    </div>
  );
};

export default CalenderManageDrawer;
