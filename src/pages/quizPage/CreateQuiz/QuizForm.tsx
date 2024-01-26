import React, { FC } from "react";
import { Form } from "antd";
import { Input } from "antd";

import { ICreateQuizValues } from ".";

interface TaskFormProps {
  onFinish: (values: ICreateQuizValues) => void;
  formRef: any;
  initialValues?: ICreateQuizValues;
}

export const QuizForm: FC<TaskFormProps> = ({
  onFinish,
  formRef,
  initialValues,
}) => {
  return (
    <Form
      name="createQuizForm"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      ref={formRef}
      initialValues={initialValues}
      layout="vertical"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
