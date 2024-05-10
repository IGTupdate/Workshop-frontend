import type { Metadata } from "next";
import "./globals.css";
import App from "./app";
import { kanit } from "./fontConfig";
import StoreProvider from "./StoreProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { antdConfig } from "./antdConfig";
import { get_server_cookie } from "./utils/get_server_cookie";

export const metadata: Metadata = {
  title: "Workshop Module",
  description: "Workshop Module",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const refreshToken = get_server_cookie("refreshToken");
  return (
    <html lang="en">
      <body className={kanit.className}>
        <AntdRegistry>
          <ConfigProvider {...antdConfig}>
            <StoreProvider>
              <App refreshToken={refreshToken}>{children}</App>
            </StoreProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
