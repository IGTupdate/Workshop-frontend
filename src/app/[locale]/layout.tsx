import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { antdConfig } from "../antdConfig";
import { kanit } from "../fontConfig";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import App from "./app";
import { get_server_cookie } from "../utils/get_server_cookie";

export const metadata: Metadata = {
  title: "Workshop Module",
  description: "Workshop Module",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const messages = await getMessages();

  const refreshToken = get_server_cookie("refresh_token");

  return (
    <html lang="en">
      <body className={kanit.className}>
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>
            <ConfigProvider {...antdConfig}>
              <StoreProvider>
                <App refreshToken={refreshToken}>
                  {children}
                </App>
              </StoreProvider>
            </ConfigProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
