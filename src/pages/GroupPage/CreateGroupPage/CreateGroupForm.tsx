import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Form, Input } from "antd";

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
        label={<FormattedMessage id="group.create.form.title" />}
        name="name"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="group.create.form.rules.required" />,
          },
          {
            max: 255,
            message: <FormattedMessage id="group.create.form.rules.max" />,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
