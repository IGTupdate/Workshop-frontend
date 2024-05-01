"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, Layout, Menu, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FiLogOut } from "react-icons/fi";

import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "../utils/variables";
import { useRouter } from "next/navigation";
import SideBarMenus from "./SideBarMenus";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { IAuthData } from "@/app/store/slices/authSlice";
import Logout from "@/app/components/Logout/Logout";

const { Text, Title } = Typography

const { Header, Sider, Content } = Layout;

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = (props: Props) => {

  const [user, setUser] = useState<IAuthData>();
  const { authData } = useAppSelector((state) => state.auth)


  useEffect(() => {
    setUser(() => {
      return authData;
    })
  }, [authData]);

  return (
    <Sider
      width={SIDEBAR_WIDTH}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      theme="light"
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      style={{ height: "100vh", position: "fixed", top: 0, overflow: "hidden" }}
    >
      <Space className={`w-full p-4`}>
        <Avatar size={"large"} icon={<UserOutlined />} />
        {!props.collapsed && (
          <div>
            <Title level={5} style={{ color: "white", textTransform: "capitalize", marginBottom: 0 }}>Hello {user?.fullName?.split(" ")[0]}</Title>
            <Text style={{ color: "#CDCDCE" }}>{user?.role || "-"}</Text>
          </div>
        )}
      </Space>

      <div className="h-[500px] overflow-auto">
        <SideBarMenus />
      </div>

      <div className="w-full absolute bottom-0 ">
        <Logout />
      </div>
    </Sider>
  );
};

export default SideBar;
