import React, { FC } from "react";
import { Form } from "antd";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";

import { ICreateTaskValues } from ".";

interface TaskFormProps {
  onFinish: (values: ICreateTaskValues) => void;
  formRef: any;
  initialValues?: ICreateTaskValues;
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

      <Form.Item
        label="Description (Markdown)"
        name="description"
        rules={[{ required: true, message: "Description is required" }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Вхідні дані (Input Data)"
        name="inputData"
        rules={[{ required: true, message: "Input Data is required" }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Вихідні дані (Output Data)"
        name="outputData"
        rules={[{ required: true, message: "Output Data is required" }]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};
