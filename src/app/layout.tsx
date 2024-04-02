import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const kanit = Kanit({
  weight: ["100", '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ["normal" , "italic"],
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
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
