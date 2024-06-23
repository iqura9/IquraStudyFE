import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

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
      layout="vertical"
    >
      <Form.Item
        label={<FormattedMessage id="create.problem.page.form.title" />}
        name="title"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="common.form.required" />,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage id="create.problem.page.form.desc" />}
        name="description"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="common.form.required" />,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage id="create.problem.page.form.input.date" />}
        name="inputData"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="common.form.required" />,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage id="create.problem.page.form.output.date" />}
        name="outputData"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="common.form.required" />,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};
