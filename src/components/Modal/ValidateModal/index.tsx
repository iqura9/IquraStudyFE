import React, { FC } from "react";
import { Modal, Result } from "antd";

type DeleteModalProps = {
  title: string;
  subTitle?: string;
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ValidateModal: FC<DeleteModalProps> = ({
  title,
  subTitle,
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      title="Confirmation modal"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Confirm"
      closable={false}
    >
      <Result title={title} subTitle={subTitle} />
    </Modal>
  );
};

export default ValidateModal;
