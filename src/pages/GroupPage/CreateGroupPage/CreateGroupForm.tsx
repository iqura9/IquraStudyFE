import React, { FC } from "react";
import { Form } from "antd";
import { Input } from "antd";

import { ICreateGroupValues } from ".";

interface CreateGroupFormProps {
  onFinish: (values: ICreateGroupValues) => void;
  formRef: any;
}

export const CreateGroupForm: FC<CreateGroupFormProps> = ({
  onFinish,
  formRef,
}) => {
  return (
    <Form
      name="createGroupForm"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      ref={formRef}
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
