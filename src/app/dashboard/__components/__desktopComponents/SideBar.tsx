'use client'
import Logout from "@/app/components/Logout/Logout";
import { useAppSelector } from "@/app/store/reduxHooks";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Space } from "antd";
import SideBarMenus from "./SideBarMenus";

const { Sider } = Layout;

interface SideBarProps {
  sidebarWidth: number;
}

const SideBar = ({ sidebarWidth }: SideBarProps) => {
  const fullName = useAppSelector((state) => state.auth.authData.fullName);

  return (
    <Sider
      width={sidebarWidth}
      theme="dark"
      trigger={null}
      collapsible
      breakpoint="md"
      style={{ height: "100vh", position: "fixed", top: 0, overflow: "hidden", zIndex: 999 }}
    >
      <Space className={`w-full p-4`}>
        <Avatar size={"large"} icon={<UserOutlined />} />
        <div>
          <h2 className="text-white1 font-semibold text-xl">Hello, </h2>
          <p className="text-gray1 text-sm font-medium">Customer</p>
        </div>
      </Space>

      <SideBarMenus/>

      <div className="w-full absolute bottom-0 ">
        <Logout/>
      </div>
    </Sider>
  );
};

export default SideBar;
