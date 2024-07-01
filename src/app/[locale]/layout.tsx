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
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  const messages = await getMessages();

  const refreshToken = get_server_cookie("refreshToken");

  return (
    <html lang={locale}>
      <body className={kanit.className}>
        <AntdRegistry>
          <ConfigProvider {...antdConfig}>
            <StoreProvider>
              <NextIntlClientProvider messages={messages}>
                <App refreshToken={refreshToken}>{children}</App>
              </NextIntlClientProvider>
            </StoreProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
