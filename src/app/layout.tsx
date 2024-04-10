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
        <ConfigProvider theme={{
          // "token": {
          //   "colorPrimary": "#ffe200",
          //   "colorInfo": "#ffe200",
          //   "colorTextBase": "#2e3033",
          //   "colorBgBase": "#ffffff",
          //   "borderRadius": 7
          // },
          // "components": {
          //   "Button": {
          //     "defaultActiveBg": "rgb(255, 226, 0)",
          //     "defaultActiveBorderColor": "rgb(255, 226, 0)",
          //     "defaultBorderColor": "rgb(255, 226, 0)",
          //     "defaultColor": "rgb(255, 226, 0)",
          //     "defaultHoverBg": "rgb(255, 255, 255)"
          //   },
          //   "Typography": {
          //     "colorText": "rgb(46, 48, 51)"
          //   },
          // }
        }}>
          <AntdRegistry>
            <StoreProvider>
              {children}
            </StoreProvider>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
