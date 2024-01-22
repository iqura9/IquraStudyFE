import React, { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, notification } from "antd";
import { Button } from "antd";
import { editGroup } from "api/group.api";
import { Paths } from "routes/paths";

import { CreateGroupForm } from "../CreateGroupPage/CreateGroupForm";

import { useMutation } from "@tanstack/react-query";

export type ICreateGroupValues = {
  name: string;
};

const EditGroupPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const formRef = useRef<HTMLFormElement>();
  const { mutate } = useMutation<unknown, Error, ICreateGroupValues>({
    mutationKey: ["EditGroup", id],
    mutationFn: (val: ICreateGroupValues) => editGroup(id, val),
    onSuccess: () => {
      notification.success({
        message: "Group was edited",
      });
      navigate(`${Paths.group}/${id}`);
    },
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const onFinish = (values: ICreateGroupValues) => {
    mutate(values);
  };

  return (
    <>
      <CreateGroupForm
        onFinish={onFinish}
        formRef={formRef}
        initialValues={state}
      />
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" onClick={() => formRef.current?.submit()}>
          Update Group
        </Button>
      </Form.Item>
    </>
  );
};

export default EditGroupPage;