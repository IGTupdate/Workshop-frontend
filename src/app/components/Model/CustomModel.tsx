import React, { ReactNode, useState } from "react";
import { Modal, Button, ButtonProps } from "antd";

type ModalProps = {
  title: string;
  open: boolean;
  onCancel: () => void;
  footer: ReactNode[];
  children: React.ReactNode;
};

const CustomModal: React.FC<ModalProps> = ({
  title,
  open,
  onCancel,
  footer,
  children,
}) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      onCancel={onCancel}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
