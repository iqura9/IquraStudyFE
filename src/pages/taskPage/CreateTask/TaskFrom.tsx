import React, { FC } from "react";
import { Form } from "antd";
import { Input } from "antd";

import { ICreateTaskValues } from ".";

interface TaskFormProps {
  onFinish: (values: ICreateTaskValues) => void;
  formRef: any;
  initialValues?: ICreateTaskValues;
}

export const TaskForm: FC<TaskFormProps> = ({
  onFinish,
  formRef,
  initialValues,
}) => {
  return (
    <Form
      name="createTaskForm"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      ref={formRef}
      initialValues={initialValues}
    >
      <Form.Item
        label="Task title"
        name="title"
        rules={[
          { required: true, message: "Please enter the Task title!" },
          { max: 255, message: "Group name cannot exceed 255 characters!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Task description" name="description">
        <Input />
      </Form.Item>
    </Form>
  );
};
