import React, { useState } from 'react';
import { Button } from 'antd';
import { FiLogOut } from "react-icons/fi";
import CustomModal from '../Model/CustomModel'; 

const Logout: React.FC = () => {
    const [visible, setVisible] = useState(false);

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
            {/* Use the custom modal component */}
            <CustomModal
                title="Confirm Logout"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ className: "bg-customGray hover:bg-opacity-80 text-white font-semibold" }}
            >
                <p>Are you sure you want to log out?</p>
            </CustomModal>
        </>
    );
}

export default Logout;
