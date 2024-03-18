import { FormattedMessage } from "react-intl";
import { Button, Form, Input } from "antd";
import { ILoginQuery } from "types/authTypes";

import { useLoginPageHandler } from "./hooks";

import styles from "./styles.module.scss";

const LoginPage = () => {
  const { loginFn } = useLoginPageHandler();
  const onFinish = (values: ILoginQuery) => {
    loginFn(values);
  };

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_container}>
        <Form name="login-form" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<FormattedMessage id="login.page.email" />}
            name="email"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="login.page.email.required" />,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="login.page.password" />}
            name="password"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="login.page.password.required" />,
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            <FormattedMessage id="login.page.log.in" />
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
