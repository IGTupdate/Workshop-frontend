"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Drawer, Layout } from "antd";
import SideBar from "./SideBar";
import HeaderContainer from "./HeaderContainer";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "../utils/variables";
import Loader from "@/app/components/Loader";
import BreadCrumbContainer from "./BreadCrumbContainer";
import { useAppSelector } from "@/app/store/reduxHooks";
import useDeviceType from "../__hooks/useDeviceType";
import SiderContainer from "./__sidebar/SiderContainer";

const { Content } = Layout;

const EmployeeDashBoardLayOut = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useDeviceType();

  const { employeeSmallDevice } = useAppSelector((state) => state.device);

  const [collapsed, setCollapsed] = useState(false);

  const [openPhoneSidebar, setOpenPhoneSideBar] = useState(false);

  useEffect(() => {
    setCollapsed(employeeSmallDevice);
  }, [employeeSmallDevice]);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-screen h-screen">
          <Loader />
        </div>
      }
    >
      <Layout className="w-full h-screen overflow-hidden">
        <SideBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          openPhoneSidebar={openPhoneSidebar}
          setOpenPhoneSideBar={setOpenPhoneSideBar}
        />

        <Layout
          // style={{
          //   marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
          // }}
          className={`ml-0 md:ml-[70px] lg:ml-[262px] `}
        >
          <HeaderContainer
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setOpenPhoneSideBar={setOpenPhoneSideBar}
          />
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
