'use client'
import { Button, Layout } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Image from "next/image";

const {Header} = Layout


type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallDevice: boolean
};

const HeaderContainer = (props: Props) => {
  return (
    <Header
      style={{ padding: 0, background: "white", position: "sticky", top: 0, zIndex:1000, display: 'flex', justifyContent: "space-between", alignItems: "center" }}
    >
      <Button
        type="text"
        icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => props.setCollapsed(!props.collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div className=" mr-4">
        {
          props.isSmallDevice ? (<Image
                src={"/images/logo-4.png"}
                alt='Logo'
                height={40}
                width={40}
            />) :(<Image
                  src={"/images/logo-3.png"}
                  alt='Logo'
                  height={40}
                  width={120}
            />)
        }
      </div>      
    </Header>
  );
};

export default HeaderContainer;
