'use client'
import { SIDEBAR_WIDTH } from "@/app/employee/dashboard/utils/variables";
import { Layout } from "antd";
import { ChildrenProps } from "../__utils/types";
import HeaderContainer from "./HeaderContainer";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

const { Content } = Layout;

const CustomerDashBoardLayout = ({ children }: ChildrenProps) => {

  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_WIDTH);

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 1024) {
        setSidebarWidth(SIDEBAR_WIDTH * 0.80);
      } else {
        setSidebarWidth(SIDEBAR_WIDTH);
      }
    }

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout className="w-full h-screen overflow-hidden">
      <SideBar sidebarWidth={sidebarWidth}/>
      <Layout
        style={{
          marginLeft: sidebarWidth,
          position: 'relative',
        }}
      >
        <HeaderContainer/>
        <Content className={`overflow-auto`}>
          <div className="p-4 w-full relative">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomerDashBoardLayout;
