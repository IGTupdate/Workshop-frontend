"use client"
import { Layout, ConfigProvider } from "antd";
import SideBar from "./__components/SideBar";
import HeaderContainer from "./__components/HeaderContainer";
import { useState } from "react";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "./utils/variables";

const { Header, Sider, Content } = Layout;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout>
            <SideBar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <Layout style={{ marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}>
                <HeaderContainer collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content>
                    <div className="p-4">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
