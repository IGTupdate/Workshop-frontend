'use client'
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import HeaderContainer from "./HeaderContainer";
import SideBar from "./SideBar";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "@/app/employee/dashboard/utils/variables";

const { Content } = Layout;

const CustomerDashBoardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const updateDeviceType = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };

    // Update device type on mount and window resize
    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  useEffect(() => {
    setCollapsed(isSmallDevice);
  }, [isSmallDevice]);

  return (
    <Layout className="w-full h-screen overflow-hidden">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} isSmallDevice={isSmallDevice} />
      <Layout
        style={{
          marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
          position: 'relative',
        }}
      >
        <HeaderContainer collapsed={collapsed} setCollapsed={setCollapsed} isSmallDevice={isSmallDevice}/>
        <Content className={`overflow-auto max-[767px]:fixed max-[767px]:top-0 max-[767px]:left-0 max-[767px]:pl-[70px] max-[767px]:pt-[64px]`}>
          <div className="p-4 w-[100%]">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomerDashBoardLayout;
