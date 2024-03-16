import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, notification, Space, Typography } from "antd";
import { getGroupCheck, requestGroupInvitation } from "api/group.api";
import Spinner from "components/Spinner";
import { Paths } from "routes/paths";

import styles from "./styles.module.scss";

import { useMutation, useQuery } from "@tanstack/react-query";

const { Title, Paragraph } = Typography;

const InviteToGroupPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getGroup", token],
    queryFn: () => getGroupCheck(token || undefined),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  const { mutate: requestValidation } = useMutation({
    mutationKey: ["requestGroupInvitation", token],
    mutationFn: () => requestGroupInvitation({ GroupId: token }),
    retry: false,
    onSuccess: () => {
      notification.success({
        message: <FormattedMessage id="common.success" />,
        description: (
          <FormattedMessage id="invite.to.group.page.notification.success" />
        ),
      });
      navigate(Paths.main);
    },
    onError: () => {
      notification.error({
        message: <FormattedMessage id="common.error" />,
        description: (
          <FormattedMessage id="invite.to.group.page.notification.wrong" />
        ),
      });
      navigate(Paths.main);
    },
  });

  if (isLoading) return <Spinner />;

  if (isError) {
    notification.error({
      message: <FormattedMessage id="common.error" />,
      description: (
        <FormattedMessage id="invite.to.group.page.notification.link.is.not.valid" />
      ),
    });
    navigate(Paths.main);
  }

  const onDecline = () => {
    navigate(Paths.main);
  };

  const onAccept = () => {
    requestValidation();
  };

  return (
    <div className={styles["invite-to-group-page"]}>
      <div className={styles.content}>
        <Title level={4}>
          <FormattedMessage id="invite.to.group.page.title" />
        </Title>
        <Paragraph>
          <FormattedMessage id="invite.to.group.page.paragraph" />{" "}
          <strong>{data?.name}</strong>
        </Paragraph>
        <Space className={styles["button-container"]}>
          <Button type="primary" onClick={onAccept}>
            <FormattedMessage id="invite.to.group.page.button.title" />
          </Button>
          <Button onClick={onDecline}>
            <FormattedMessage id="invite.to.group.page.button.decline" />
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default InviteToGroupPage;
