import React, { useState } from 'react';
import { Modal, Button, ButtonProps } from 'antd';

type ModalProps = {
    title: string;
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    okText?: string;
    cancelText?: string;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({
    title,
    open,
    onOk,
    onCancel,
    okText = 'Confirm',
    cancelText = 'Cancel',
    okButtonProps,
    cancelButtonProps,
    children
}) => {
    return (
        <Modal
            title={title}
            centered
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
            okButtonProps={okButtonProps}
            cancelButtonProps={cancelButtonProps}
        >
            {children}
        </Modal>
    );
}

export default CustomModal;
