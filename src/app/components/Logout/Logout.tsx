import React, { useState } from "react";
import { Button } from "antd";
import { FiLogOut } from "react-icons/fi";
import CustomModal from "../Model/CustomModel";
import { useAppDispatch } from "@/app/store/reduxHooks";
import { logout } from "@/app/services/operations/auth/customerAuth";
import { useRouter } from "next/navigation";
import { setAuthLoading, setAuthStep } from "@/app/store/slices/authSlice";
import { useTranslations } from "next-intl";

type Props = {
  collapsed?: boolean;
};

const Logout = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslations("LogOut");

  const handleLogout = async () => {
    try {
      dispatch(logout());
      setVisible(false);
      router.push("/");
      dispatch(setAuthLoading(false));
      dispatch(setAuthStep(0));
    } catch (err) {
      // console.error(err);
    } finally {
      dispatch(setAuthLoading(false));
      router.refresh();
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        // type="primary"
        style={{
          padding: "1.5em 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          color: "white",
        }}
        className={`${!props.collapsed ? "bg-[#063146]" : "bg-transparent"} w-full hover:bg-[#063142] shadow-xl`}
        icon={<FiLogOut />}
        onClick={showModal}
      >
        {!props.collapsed ? <span>{t("logout")}</span> : ""}
      </Button>
      {/* Use the custom modal component */}
      <CustomModal
        title={t("title")}
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={() => handleCancel()}>
            {t("cancel")}
          </Button>,
          <Button type="primary" key="logout" onClick={() => handleLogout()}>
            {t("logout")}
          </Button>,
        ]}
      >
        <p>{t("text")}</p>
      </CustomModal>
    </>
  );
};

export default Logout;
