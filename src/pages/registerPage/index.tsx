import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Button, Form, Input, Radio } from "antd";
import { IRegisterQuery } from "types/authTypes";

import { useRegisterPageHandler } from "./hooks";

import styles from "./styles.module.scss";

const RegisterPage = () => {
  const { registerFn } = useRegisterPageHandler();
  const onFinish = (values: IRegisterQuery) => {
    registerFn(values);
  };

  return (
    <div className={styles.register_wrapper}>
      <div className={styles.register_container}>
        <Form name="register-form" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<FormattedMessage id="common.email" />}
            name="email"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="common.form.required" />,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="common.username" />}
            name="userName"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="common.form.required" />,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label={<FormattedMessage id="register.page.select" />}
            name="role"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="common.form.required" />,
              },
            ]}
          >
            <Radio.Group className={styles.user_type_radio_group}>
              <Radio className={styles.user_type_radio} value="Student">
                <FormattedMessage id="common.student" />
              </Radio>
              <Radio className={styles.user_type_radio} value="Teacher">
                <FormattedMessage id="common.teacher" />
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="login.page.password" />}
            name="password"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="common.form.required" />,
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            <FormattedMessage id="register.page.register" />
          </Button>
        </Form>
        <Link to="/login">
          <Button type="link" block size="large">
            <FormattedMessage id="login.page.log.in" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
