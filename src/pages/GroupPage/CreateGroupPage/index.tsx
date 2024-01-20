import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, notification } from "antd";
import { Button } from "antd";
import { createGroup } from "api/group.api";
import { Paths } from "routes/paths";

import { CreateGroupForm } from "./CreateGroupForm";

import { useMutation } from "@tanstack/react-query";

export type ICreateGroupValues = {
  name: string;
};

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>();
  const { mutate } = useMutation<unknown, Error, ICreateGroupValues>({
    mutationKey: ["CreateGroup"],
    mutationFn: (val: ICreateGroupValues) => createGroup(val),
    onSuccess: () => {
      notification.success({
        message: "Group was created",
      });
      navigate(Paths.groups);
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
          Create Group
        </Button>
      </Form.Item>
    </>
  );
};

export default CreateGroupPage;