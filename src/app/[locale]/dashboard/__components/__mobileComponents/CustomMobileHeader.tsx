"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { IAuthData, setAuthLoading } from "@/app/store/slices/authSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import Fly from "../../../../../../public/images/fly.webp";
import Link from "next/link";

import { IoNotifications, IoSettingsOutline } from "react-icons/io5";
import { PiUserCircleFill } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { usePathname } from "next/navigation";

import { Button, Dropdown, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { logout } from "@/app/services/operations/auth/customerAuth";
import CustomModal from "@/app/components/Model/CustomModel";

const CustomMobileHeader = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<IAuthData | null>(null);
  const authData = useAppSelector((state) => state.auth.authData);
  const pathName = usePathname();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      setVisible(false);
      router.push("/");
      dispatch(setAuthLoading(false));
    } catch (err) {
      // console.error(err);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    setUser(authData);
  }, [authData]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 w-32"
        >
          <IoSettingsOutline /> Setting
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <p className="flex items-center gap-2 w-32" onClick={showModal}>
          <FiLogOut />
          Logout
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="fixed z-50 top-0 left-0 w-full bg-[#f5f5f5] p-4 flex justify-between items-center">
        {/* heading */}
        {pathName.split("/")[2] === "notifications" ? (
          <Link href={"/dashboard"} className="text-black">
            <h1 className="text-base font-medium">Active Appointment</h1>
            <h4 className="text-base font-medium">Vehicle Advance</h4>
          </Link>
        ) : (
          <Link href={"/dashboard"} className="text-black">
            <div className="heading relative">
              <h1 className="text-2xl font-semibold">Hey</h1>
              <h1 className="text-2xl font-bold capitalize">
                {user?.fullName?.split(" ")[0]}
              </h1>
              <Image
                src={"/images/fly.webp"}
                alt="Fly"
                className="absolute top-[10px] right-[-24px]"
              />
            </div>
          </Link>
        )}

        {/* side icons */}

        <div className="flex justify-center items-center gap-2">
          <Link href={"/dashboard/notifications"}>
            <IoNotifications className="text-3xl text-[#2b2c30]" />
          </Link>
          <Link href={"/dashboard/profile"}>
            <PiUserCircleFill className="text-5xl text-[#2b2c30]" />
          </Link>

          <Dropdown
            menu={{
              items,
            }}
          >
            <Typography.Link>
              <Space className="flex-col gap-0 m-0">
                <BsThreeDotsVertical className="text-4xl text-[#2b2c30]" />
              </Space>
            </Typography.Link>
          </Dropdown>
        </div>
      </div>

      <CustomModal
        title="Confirm Logout"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={() => handleCancel()}>
            Cancel
          </Button>,
          <Button type="primary" key="logout" onClick={() => handleLogout()}>
            Logout
          </Button>,
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </CustomModal>
    </>
  );
};

export default CustomMobileHeader;
