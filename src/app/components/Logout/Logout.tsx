'use client'
import { useAppDispatch } from '@/app/store/reduxHooks';
import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { FiLogOut } from "react-icons/fi";

type Props = {}

const Logout = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            console.log("LOGOUT");
        } catch(err) {
            console.error(err);
        }
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        handleLogout();
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Button
                type="primary"
                style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                className="bg-blue1 text-white1 font-semibold w-full h-10"
                icon={<FiLogOut />}
                onClick={showModal}
            >
                LogOut
            </Button>
            <Modal
                title="Confirm Logout"
                centered
                width={300}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
                okButtonProps={{ className: "bg-customGray hover:bg-opacity-80 text-white font-semibold" }}
            >
                <p>Are you sure you want to log out?</p>
            </Modal>
        </>
    );
}

export default Logout;
