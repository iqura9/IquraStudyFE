import { FC } from "react";
import { FormattedMessage } from "react-intl";
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
      title={<FormattedMessage id="modal.validate.title" />}
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={<FormattedMessage id="common.confirm" />}
      closable={false}
    >
      <Result title={title} subTitle={subTitle} />
    </Modal>
  );
};

export default ValidateModal;
