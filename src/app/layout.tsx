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
              "colorPrimary": "#fadb14",
              "colorInfo": "#fadb14"
            },
            "components": {
              "Menu": {
                "colorBgContainer": "#031c30",
                "colorFillAlter": "#031c30",
                "itemHoverBg": "#063146",
                "itemHoverColor": "rgba(255, 255, 255, 0.88)",
                "itemSelectedBg": "#063146",
                "itemSelectedColor": "rgb(255, 255, 255)",
                "itemColor": "#FFFFFF"
              },
              "Layout": {
                "colorBgContainer": "#031c30",
              },
              "Table": {
                "headerBg": "#fadb14",
                "headerColor": "rgba(255, 255, 255, 0.88)",
                "rowHoverBg": "rgb(245, 245, 245)"
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
