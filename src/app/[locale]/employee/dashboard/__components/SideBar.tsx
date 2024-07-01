"use client";

import { Drawer, Layout, Typography } from "antd";
import React from "react";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "../utils/variables";
import SiderContainer from "./__sidebar/SiderContainer";

const { Sider } = Layout;

type Props = {
  collapsed?: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  openPhoneSidebar: boolean;
  setOpenPhoneSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = (props: Props) => {
  return (
    <Sider
      width={SIDEBAR_WIDTH}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      theme="light"
      trigger={null}
      collapsible
      collapsed={props?.collapsed}
      style={{
        height: "100vh",
        position: "fixed",
        top: 0,
        overflow: "hidden",
      }}
      className="md:block hidden"
    >
      <SiderContainer
        collapsed={props.collapsed}
        setCollapsed={props.setCollapsed}
        openPhoneSidebar={props.openPhoneSidebar}
      />

      <Drawer
        title={<div className="text-wh">AppViser</div>}
        placement={"left"}
        // closable={false}
        onClose={() => {
          props.setOpenPhoneSideBar(false);
        }}
        open={props.openPhoneSidebar}
        key={"left"}
        className="bg-[#031c30] text-white p-0"
        style={{ padding: 0 }}
      >
        <SiderContainer
          collapsed={props.collapsed}
          setCollapsed={props.setCollapsed}
          openPhoneSidebar={props.openPhoneSidebar}
        />
      </Drawer>
    </Sider>
  );
};

export default SideBar;
