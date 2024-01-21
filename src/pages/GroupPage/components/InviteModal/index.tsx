import React, { FC, useState } from "react";
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
    message.success("Copied to clipboard!");
  };

  return (
    <Modal
      title="Invite by Token"
      visible={visible}
      onCancel={onCancel}
      footer={[]}
    >
      <div style={{ marginTop: "16px" }}>
        <div style={{ width: "100%", flex: 1, display: "flex", gap: "8px" }}>
          <Input value={inputValue} disabled style={{ flex: 1 }} />
          <Button type="primary" onClick={handleCopyToClipboard}>
            Copy
          </Button>
        </div>
        <p style={{ marginTop: "8px" }}>
          Share this token with others to invite them to the group.
        </p>
      </div>
    </Modal>
  );
};

export default InviteModal;
