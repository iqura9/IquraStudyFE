import React, { FC, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Input, message, Modal } from "antd";

type InviteModalProps = {
  visible: boolean;
  onCancel: () => void;
  invitationToken: string;
};

const InviteModal: FC<InviteModalProps> = ({
  visible,
  onCancel,
  invitationToken,
}) => {
  const [inputValue] = useState(invitationToken);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(invitationToken);
    message.success(<FormattedMessage id="group.page.modal.invite.success" />);
  };

  return (
    <Modal
      title={<FormattedMessage id="group.page.modal.invite.title" />}
      visible={visible}
      onCancel={onCancel}
      footer={[]}
    >
      <div style={{ marginTop: "16px" }}>
        <div style={{ width: "100%", flex: 1, display: "flex", gap: "8px" }}>
          <Input value={inputValue} disabled style={{ flex: 1 }} />
          <Button type="primary" onClick={handleCopyToClipboard}>
            <FormattedMessage id="group.page.modal.invite.copy" />
          </Button>
        </div>
        <p style={{ marginTop: "8px" }}>
          <FormattedMessage id="group.page.modal.invite.desc" />
        </p>
      </div>
    </Modal>
  );
};

export default InviteModal;
