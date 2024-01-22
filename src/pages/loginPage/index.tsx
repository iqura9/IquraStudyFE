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
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
