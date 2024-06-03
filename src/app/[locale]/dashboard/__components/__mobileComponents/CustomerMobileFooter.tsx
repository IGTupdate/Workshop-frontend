"use client";
import Image from "next/image";
import React from "react";
// import Services from "../../../../../../public/images/services.webp";
// import Calender from "../../../../../../public/images/calander.webp";
import { FaHistory } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import Link from "next/link";
import { Dropdown, Space, Typography } from "antd";
import type { MenuProps } from "antd";

const CustomerMobileFooter = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href="/dashboard/appointment/reschedule" className="w-32 block">
          Reschedule
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/dashboard/appointment/cancel" className="w-32 block">
          Cancel
        </Link>
      ),
    },
  ];

  return (
    <div className="fixed z-40 left-1/2 translate-x-[-50%] bottom-4 bg-white rounded-2xl p-4 py-1 flex justify-between items-center gap-4 w-11/12 shadow-2xl">
      <div className="flex flex-col items-center justify-center cursor-pointer">
        <Dropdown
          menu={{
            items,
            selectable: true,
          }}
        >
          <Typography.Link>
            <Space className="flex-col gap-0 m-0">
              <Image
                fill
                src={"/images/services.webp"}
                alt="Services"
                className="h-[25px] w-[25px]"
              />
              <p className="mt-[1px] text-black mb-0 text-nowrap">Services</p>
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>
      <Link href={"/dashboard/previous-appointments"} className="text-black">
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <FaHistory className="text-2xl text-black" />
          <p className="mt-1">History</p>
        </div>
      </Link>
      <Link href={"/dashboard/appointment/book"}>
        <div className="flex flex-col items-center justify-center h-[70px] w-[70px] rounded-full bg-gradient-to-r from-[#FFE301] to-[#D7C000] relative top-[-35px] cursor-pointer">
          <Image
            fill
            src={"/images/calander.webp"}
            alt="Calender"
            className="h-[50px] w-[50px]"
          />
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center cursor-pointer">
        <FaCreditCard className="text-2xl text-black" />
        <p className="mt-1">Payments</p>
      </div>
      <div className="flex flex-col items-center justify-center cursor-pointer">
        <MdHeadsetMic className="text-3xl text-black" />
        <p className="mt-0">Chat</p>
      </div>
    </div>
  );
};

export default CustomerMobileFooter;
