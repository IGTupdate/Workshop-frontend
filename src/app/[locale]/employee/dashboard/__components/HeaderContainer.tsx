import { Avatar, Badge, Button, Layout, Typography } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";

import { FaRegUser } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { HiMiniLanguage } from "react-icons/hi2";
import HeaderContainerLeft from "./headers/HeaderContainerLeft";
import { CiMenuKebab } from "react-icons/ci";

const { Title } = Typography;
const { Header } = Layout;

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPhoneSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderContainer = (props: Props) => {
  return (
    <Header
      style={{
        padding: 0,
        paddingTop: 20,
        paddingBottom: 20,
        background: "white",
        // background: "transparent",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      <div className="md:px-6 px-4 w-full h-full flex justify-between items-center">
        {/* left */}
        <div className="flex items-center justify-center gap-3">
          <Button
            className="md:hidden block"
            type="text"
            icon={
              props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
            onClick={() => props.setOpenPhoneSideBar(true)}
            style={{
              fontSize: "16px",
            }}
          />

          <div className="">
            <Title level={4} style={{ margin: 0 }}>
              Dashboard
            </Title>
          </div>
        </div>

        <div className="">
          <HeaderContainerLeft />
        </div>
      </div>
    </Header>
  );
};

export default HeaderContainer;
