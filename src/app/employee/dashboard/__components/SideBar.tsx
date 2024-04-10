"use client";

import React, { useState } from "react";
import { Avatar, Button, Divider, Layout, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FiLogOut } from "react-icons/fi";

import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "../utils/variables";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import SideBarMenus from "./SideBarMenus";
import { useAppDispatch } from "@/app/store/reduxHooks";
import { logout } from "@/app/services/operations/auth/customerAuth";

const { Header, Sider, Content } = Layout;

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = (props: Props) => {

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <Sider
      width={SIDEBAR_WIDTH}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      theme="dark"
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      style={{ height: "100vh", position: "fixed", top: 0, overflow: "hidden" }}
    >
      <Space className={`w-full p-4`}>
        <Avatar size={"large"} icon={<UserOutlined />} />
        {!props.collapsed && (
          <div>
            <h2 className="text-white1 font-semibold text-xl">Hello User</h2>
            <p className="text-gray1 text-sm font-medium">Advisor</p>
          </div>
        )}
      </Space>

      <SideBarMenus />

      <div className="w-full absolute bottom-0 ">
        <Button
          onClick={handleLogout}
          type="primary"
          style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
          className="bg-blue1 text-white1 font-semibold w-full h-10"
          icon={<FiLogOut />}
        >
          LogOut
        </Button>
      </div>
    </Sider>
  );
};

export default SideBar;
