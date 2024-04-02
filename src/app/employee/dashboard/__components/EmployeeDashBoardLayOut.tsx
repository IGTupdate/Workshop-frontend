"use client";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";
import HeaderContainer from "./HeaderContainer";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "../utils/variables";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

const EmployeeDashBoardLayOut = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => { });
  return (
    <Layout className="w-full h-screen overflow-hidden">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        }}
      >
        <HeaderContainer collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="h-full overflow-auto">
          <div className="p-4">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmployeeDashBoardLayOut;
