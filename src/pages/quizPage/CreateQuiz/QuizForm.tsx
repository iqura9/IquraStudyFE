import { Form, Input } from "antd";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

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
        label={<FormattedMessage id="common.title" />}
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
    </Form>
  );
};
