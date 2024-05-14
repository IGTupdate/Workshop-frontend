"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Layout, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "../utils/variables";
import SideBarMenus from "./SideBarMenus";
import { useAppSelector } from "@/app/store/reduxHooks";
import { IAuthData } from "@/app/store/slices/authSlice";
import Logout from "@/app/components/Logout/Logout";
import { useTranslations } from "next-intl";

const { Text, Title } = Typography;

const { Sider } = Layout;

type Props = {
  collapsed?: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = (props: Props) => {
  const [user, setUser] = useState<IAuthData>();
  const { authData } = useAppSelector((state) => state.auth);
  const t = useTranslations("EmployeeSideBar");

  useEffect(() => {
    setUser(() => {
      return authData;
    });
  }, [authData]);

  return (
    <Sider
      width={SIDEBAR_WIDTH}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      theme="light"
      trigger={null}
      collapsible
      collapsed={props?.collapsed}
      style={{ height: "100vh", position: "fixed", top: 0, overflow: "hidden" }}
    >
      <Space className={`w-full p-4`}>
        <Avatar size={"large"} icon={<UserOutlined />} />
        {!props?.collapsed && (
          <div>
            <Title
              level={5}
              style={{
                color: "white",
                textTransform: "capitalize",
                marginBottom: 0,
              }}
            >
              {t("heading")} {user?.fullName?.split(" ")[0]}
            </Title>
            <Text className="capitalize" style={{ color: "#CDCDCE" }}>
              {user?.role || "-"}
            </Text>
          </div>
        )}
      </Space>

      <div className="h-[500px] overflow-auto">
        <SideBarMenus />
      </div>

      <div className="w-[150px] lg:w-[200px]  absolute bottom-6 left-1/2 translate-x-[-50%] border-t pt-10">
        <Logout collapsed={props?.collapsed} />
      </div>
    </Sider>
  );
};

export default SideBar;
