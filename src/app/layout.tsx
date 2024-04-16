import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from "antd";


const kanit = Kanit({
  weight: ["100", '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ["normal", "italic"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanit',
});


export const metadata: Metadata = {
  title: "Workshop Module",
  description: "Workshop Module",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <AntdRegistry>
          <ConfigProvider theme={{
            "token": {
              "colorPrimary": "#ffe200",
              "colorInfo": "#ffe200",
              "colorTextBase": "#2e3033",
            },
            "components": {
              "Menu": {
                "colorBgContainer": "#171717",
                "colorFillAlter": "#2E3033",
                "colorText": "#CDCDCE",
                "itemHoverColor": "#A49339",
                itemSelectedBg: "#A49339",
                itemSelectedColor: "#ffffff",
              },
              "Layout": {
                "colorBgContainer": "#171717",
              }
            }
          }}>
            <StoreProvider>
              {children}
            </StoreProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html >
  );
}
