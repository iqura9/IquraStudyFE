import React, { FC } from "react";
import { Modal } from "antd";

type DeleteModalProps = {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

const DeleteConfirmationModal: FC<DeleteModalProps> = ({
  visible,
  onCancel,
  onDelete,
}) => {
  return (
    <Modal
      title="Delete Confirmation"
      visible={visible}
      onOk={onDelete}
      onCancel={onCancel}
      okText="Delete"
      okType="danger"
    >
      <p>Are you sure you want to delete this record?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
