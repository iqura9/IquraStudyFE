import React from "react";
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
        message: "Success",
        description: "Request successfully sent to teacher of the course",
      });
      navigate(Paths.main);
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Something went wrong.",
      });
      navigate(Paths.main);
    },
  });

  if (isLoading) return <Spinner />;

  if (isError) {
    notification.error({
      message: "Error",
      description: "Invitation link is not valid.",
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
        <Title level={4}>Welcome to the Invite To Group Page!</Title>
        <Paragraph>
          Group name: <strong>{data?.name}</strong>
        </Paragraph>
        <Space className={styles["button-container"]}>
          <Button type="primary" onClick={onAccept}>
            Request Invitation
          </Button>
          <Button onClick={onDecline}>Decline</Button>
        </Space>
      </div>
    </div>
  );
};

export default InviteToGroupPage;
