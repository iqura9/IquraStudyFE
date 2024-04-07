import React, { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import { Button, Form, Input, Typography } from "antd";
import MarkdownIt from "markdown-it";

import "react-markdown-editor-lite/lib/index.css";

const { Title } = Typography;

const mdParser = new MarkdownIt();

const CreateProblemPage = () => {
  const [form] = Form.useForm();
  const [markdownContent, setMarkdownContent] = useState("");
  const onFinish = (values) => {
    console.log("Received values:", values);
    console.log("Markdown content:", markdownContent);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Title level={2}>Create Problem</Title>
      <Form
        form={form}
        name="createProblemForm"
        initialValues={{ description: "" }}
        onFinish={onFinish}
        layout="vertical" // Set form layout to vertical
      >
        <Form.Item
          label="Problem Name"
          name="problemName"
          rules={[{ required: true, message: "Please enter problem name!" }]}
        >
          <Input placeholder="Enter problem name" />
        </Form.Item>

        <MdEditor
          style={{ height: "300px" }}
          value={markdownContent}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ text }) => setMarkdownContent(text)}
        />

        <Form.Item label="Test Cases" name="testCases">
          <Input.TextArea
            placeholder="Enter test cases"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Generate Markdown
          </Button>
          <Button
            onClick={() => form.resetFields()}
            style={{ marginLeft: "10px" }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProblemPage;
