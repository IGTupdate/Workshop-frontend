"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";
import HeaderContainer from "./HeaderContainer";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "../utils/variables";
import Loader from "@/app/components/Loader";
import BreadCrumbContainer from "./BreadCrumbContainer";

const { Header, Sider, Content } = Layout;

const EmployeeDashBoardLayOut = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {});
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-screen min-h-screen">
          <Loader />
        </div>
      }
    >
      <Layout className="w-full h-screen overflow-hidden">
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout
          style={{
            marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
          }}
        >
          <HeaderContainer collapsed={collapsed} setCollapsed={setCollapsed} />
          <BreadCrumbContainer />

          <Content className="h-full overflow-auto">
            <div className="p-4">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  );
};

export default EmployeeDashBoardLayOut;
