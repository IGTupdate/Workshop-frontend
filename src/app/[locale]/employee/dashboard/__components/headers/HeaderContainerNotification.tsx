"use client";

import WorkInProgress from "@/app/components/Common/WorkInProgress";
import { Avatar, Badge, Popover } from "antd";
import React, { useState } from "react";
import { MdNotificationsNone } from "react-icons/md";

type Props = {};

const HeaderContainerNotification = (props: Props) => {
  const [openNotification, setOpenNotification] = useState(false);

  const hideNotification = () => {
    setOpenNotification(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpenNotification(newOpen);
  };
  return (
    <div>
      <Popover
        content={<NotificationPopOverContent />}
        title="Notifications"
        trigger="click"
        open={openNotification}
        onOpenChange={handleOpenChange}
      >
        <button title="Notifications">
          <Badge
            count={100}
            style={{ backgroundColor: "#F9DC04", color: "black" }}
          >
            <Avatar shape="square" icon={<MdNotificationsNone />} />
          </Badge>
        </button>
      </Popover>
    </div>
  );
};

const NotificationPopOverContent = () => {
  return (
    <div>
      <WorkInProgress />
      <ul>
        {[1, 2, 3, 4, 5, 6].map((el, index) => {
          return (
            <li
              key={index}
              className="px-2 py-1 hover:bg-gray-100  cursor-pointer"
            >
              <h2 className="text-md font-medium">Notification {el}</h2>
              <p className="text-gray-400 text-[12px]">12:05 24-2-2024</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default HeaderContainerNotification;
