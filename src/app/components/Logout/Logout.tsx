import React, { useState } from 'react';
import { Button } from 'antd';
import { FiLogOut } from "react-icons/fi";
import CustomModal from '../Model/CustomModel';
import { useAppDispatch } from '@/app/store/reduxHooks';
import { logout } from '@/app/services/operations/auth/customerAuth';
import { useRouter } from 'next/navigation';

const Logout: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            dispatch(logout())
            setVisible(false)
            router.push('/')
        } catch (err) {
            console.error(err);
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
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={() => handleCancel()}>Cancel</Button>,
                    <Button key="logout" onClick={() => handleLogout()}>Logout</Button>,
                ]}
            >
                <p>Are you sure you want to log out?</p>
            </CustomModal>
        </>
    );
}

export default Logout;