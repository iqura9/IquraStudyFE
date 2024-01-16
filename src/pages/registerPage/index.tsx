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
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Select Type"
            name="role"
            rules={[{ required: true, message: "Please select a user type!" }]}
          >
            <Radio.Group className={styles.user_type_radio_group}>
              <Radio className={styles.user_type_radio} value="Student">
                Student
              </Radio>
              <Radio className={styles.user_type_radio} value="Teacher">
                Teacher
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
