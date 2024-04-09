'use client'
import { Button, Layout } from "antd";
import Image from "next/image";

const {Header} = Layout

type Props = {
};

const HeaderContainer = (props: Props) => {
  return (
    <Header
      style={{ padding: 0, background: "white", position: "sticky", top: 0, zIndex:1000, display: 'flex', justifyContent: "space-between", alignItems: "center" }}
    >
      <Button
        type="text"
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div className=" mr-4">
      <Image
        src={"/images/logo-3.png"}
        alt='Logo'
        height={40}
        width={120}
      />
      </div>      
    </Header>
  );
};

export default HeaderContainer;
