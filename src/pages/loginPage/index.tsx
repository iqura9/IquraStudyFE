import { Button, Form, Input } from "antd";
import styles from "./styles.module.scss";

const LoginPage = () => {
  const onFinish = (values: { username: string; password: string }) => {
    console.log("Received values:", values);
    // Add your authentication logic here
  };

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_container}>
        <Form name="login-form" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
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
