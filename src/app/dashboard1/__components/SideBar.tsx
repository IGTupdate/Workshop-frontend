"use client";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "@/app/employee/dashboard/utils/variables";
import { useAppSelector } from "@/app/store/reduxHooks";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Space } from "antd";
import React, { useState } from "react";
import SideBarMenus from "./SideBarMenus";
import Logout from "@/app/components/Logout/Logout";

const { Sider } = Layout;

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallDevice: boolean
};
const SideBar = (props: Props) => {
  const [isCollapsedXs, setIsCollapsedXs] = useState(false);

  const handleBreakpoint = (broken: boolean) => {
    setIsCollapsedXs(broken);
    props.setCollapsed(broken);
  };

  const authData = useAppSelector((state) => state.auth.authData)

  return (
    <Sider
      width={SIDEBAR_WIDTH}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      theme="dark"
      trigger={null}
      collapsible
      breakpoint="md"
      collapsed={props.collapsed}
      onBreakpoint={handleBreakpoint}
      style={{ height: "100vh", position: "fixed", top: 0, overflow: "hidden", zIndex: 999 }}
    >
      <Space className={`w-full p-4`}>
        <Avatar size={"large"} icon={<UserOutlined />} />
        {!props.collapsed && (
          <div>
            <h2 className="text-white1 font-semibold text-xl">Hello, {authData?.fullName?.split(' ')[0]}</h2>
            <p className="text-gray1 text-sm font-medium">Customer</p>
          </div>
        )}
      </Space>

      <SideBarMenus collapsed={props.collapsed} setCollapsed={props.setCollapsed} isSmallDevice={props.isSmallDevice}/>

      <div className="w-full absolute bottom-0 ">
        <Logout/>
      </div>
    </Sider>
  );
};

export default SideBar;

