"use client";

import Logout from "@/app/components/Logout/Logout";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Typography } from "antd";
import Link from "next/link";
import SideBarMenus from "../SideBarMenus";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/store/reduxHooks";
import { IAuthData } from "@/app/store/slices/authSlice";

const { Text, Title } = Typography;

type Props = {
  collapsed?: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  openPhoneSidebar?: boolean;
};

const SiderContainer = (props: Props) => {
  const [user, setUser] = useState<IAuthData>();
  const { authData } = useAppSelector((state) => state.auth);
  const t = useTranslations("EmployeeSideBar");

  useEffect(() => {
    setUser(() => {
      return authData;
    });
  }, [authData]);
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="">
        <Link href={"/employee/dashboard/employeeProfile"}>
          <Space className={`w-full p-4`}>
            <Avatar size={"large"} icon={<UserOutlined />} />
            {(!props?.collapsed || props.openPhoneSidebar) && (
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
        </Link>
      </div>

      <div className="overflow-auto pb-8 sidebar-custom-scrollbar flex-1">
        <SideBarMenus />
      </div>

      <div className="w-full bg-[#031c30]">
        <div className="w-full px-1 md:w-[150px] lg:w-[200px] border-t py-8 mx-auto">
          <Logout collapsed={props?.collapsed} />
        </div>
      </div>
    </div>
  );
};

export default SiderContainer;
