import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Form , Input } from "antd";

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
        label={<FormattedMessage id="task.page.task.title" />}
        name="title"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="common.form.required" />,
          },
          {
            max: 255,
            message: (
              <FormattedMessage
                id="task.page.task.title.max"
                values={{ count: 255 }}
              />
            ),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={<FormattedMessage id="task.page.task.desc" />}
        name="description"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="common.form.required" />,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
