"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, Layout, Menu, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FiLogOut } from "react-icons/fi";

import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "../utils/variables";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import SideBarMenus from "./SideBarMenus";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { logout } from "@/app/services/operations/auth/customerAuth";
import { IAuthData } from "@/app/store/slices/authSlice";
import Logout from "@/app/components/Logout/Logout";

const { Header, Sider, Content } = Layout;

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = (props: Props) => {

  const [user, setUser] = useState<IAuthData>();


  const { authData } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch();
  const router = useRouter();


  useEffect(() => {
    setUser(() => {
      return authData;
    })
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/employee/login")
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
            <h2 className="text-white1 font-semibold text-xl capitalize">Hello {user?.fullName?.split(" ")[0]}</h2>
            <p className="text-gray1 text-sm font-medium">{"user?.role" || "-"}</p>
          </div>
        )}
      </Space>

      <SideBarMenus />

      <div className="w-full absolute bottom-0 ">
        <Logout />
      </div>
    </Sider>
  );
};

export default SideBar;
