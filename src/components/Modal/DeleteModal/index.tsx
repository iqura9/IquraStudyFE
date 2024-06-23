import { FC } from "react";
import { FormattedMessage } from "react-intl";
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
      title={<FormattedMessage id="modal.delete.title" />}
      visible={visible}
      onOk={onDelete}
      onCancel={onCancel}
      okText={<FormattedMessage id="common.delete" />}
      okType="danger"
    >
      <p>
        <FormattedMessage id="modal.delete.desc" />
      </p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
