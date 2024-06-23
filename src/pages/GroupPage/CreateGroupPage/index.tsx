import { Button, Form, notification } from "antd";
import { createGroup } from "api/group.api";
import { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Paths } from "routes/paths";
import { IGroup } from "types/groupTypes";

import { CreateGroupForm } from "./CreateGroupForm";

import { useMutation } from "@tanstack/react-query";

export type ICreateGroupValues = {
  name: string;
};

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>();
  const { mutate } = useMutation<IGroup, Error, ICreateGroupValues>({
    mutationKey: ["CreateGroup"],
    mutationFn: (val: ICreateGroupValues) => createGroup(val),
    onSuccess: (response) => {
      notification.success({
        message: <FormattedMessage id="group.create.page.notification.title" />,
      });
      navigate(`${Paths.group}/${response.id}`);
    },
  });

  const onFinish = (values: ICreateGroupValues) => {
    mutate(values);
  };

  return (
    <>
      <CreateGroupForm onFinish={onFinish} formRef={formRef} />
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" onClick={() => formRef.current?.submit()}>
          <FormattedMessage id="group.create.page.title" />
        </Button>
      </Form.Item>
    </>
  );
};

export default CreateGroupPage;
