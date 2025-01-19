import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Button } from "antd";

interface LinkButtonProps {
  to: string;
  formattedMessageId: string;
}

export default function LinkButton({
  to,
  formattedMessageId,
}: LinkButtonProps) {
  return (
    <Link to={to}>
      <Button type="primary">
        <FormattedMessage id={formattedMessageId} />
      </Button>
    </Link>
  );
}
