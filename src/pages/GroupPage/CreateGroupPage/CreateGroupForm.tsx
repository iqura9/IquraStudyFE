import React, { FC } from "react";
import { Form } from "antd";
import { Input } from "antd";

import { ICreateGroupValues } from ".";

interface CreateGroupFormProps {
  onFinish: (values: ICreateGroupValues) => void;
  formRef: any;
  initialValues?: {
    name: string;
  };
}

export const CreateGroupForm: FC<CreateGroupFormProps> = ({
  onFinish,
  formRef,
  initialValues,
}) => {
  return (
    <Form
      name="createGroupForm"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      ref={formRef}
      initialValues={initialValues}
    >
      <Form.Item
        label="Group Name"
        name="name"
        rules={[
          { required: true, message: "Please enter the group name!" },
          { max: 255, message: "Group name cannot exceed 255 characters!" },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
