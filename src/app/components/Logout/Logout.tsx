import React, { useState } from 'react';
import { Button } from 'antd';
import { FiLogOut } from "react-icons/fi";
import CustomModal from '../Model/CustomModel';
import { useAppDispatch } from '@/app/store/reduxHooks';
import { logout } from '@/app/services/operations/auth/customerAuth';
import { useRouter } from 'next/navigation';

type Props = {
  collapsed?: boolean;
};

const Logout = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      setVisible(false);
      router.push('/');
    } catch (err) {
      // Handle error
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
        className={`w-full ${!props.collapsed ? 'bg-[#063146] text-white' : 'bg-transparent text-[#063146]'} hover:bg-[#063142] shadow-xl`}
        icon={<FiLogOut />}
        onClick={showModal}
      >
        {props.collapsed ? null : 'LogOut'}
      </Button>
      {/* Use the custom modal component */}
      <CustomModal
        title="Confirm Logout"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={() => handleCancel()}>Cancel</Button>,
          <Button type='primary' key="logout" onClick={() => handleLogout()}>Logout</Button>,
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </CustomModal>
    </>
  );
};

export default Logout;
