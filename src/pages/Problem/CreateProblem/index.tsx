import React, { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import { Button, Form, Input, notification, Typography } from "antd";
import { createTask, deleteGroup } from "api/group.api";
import { createProblem } from "api/problem.api";
import MarkdownIt from "markdown-it";

import "react-markdown-editor-lite/lib/index.css";

import { useMutation } from "@tanstack/react-query";

const { Title } = Typography;

const mdParser = new MarkdownIt();

const CreateProblemPage = () => {
  const [form] = Form.useForm();
  const [markdownContent, setMarkdownContent] = useState("");

  const { mutate: createProblemFn } = useMutation<unknown, Error>({
    mutationKey: ["createProblem"],
    mutationFn: (data) => createProblem(data),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const onFinish = (values) => {
    const data = {
      ...values,
      description: markdownContent,
    };
    createProblemFn(data);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Title level={2}>Create Problem</Title>
      <Form
        form={form}
        name="createProblemForm"
        initialValues={{ description: "" }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Problem Name"
          name="title"
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

        <Form.List name="testCases">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item
                    label={`Test Case ${index + 1}`}
                    rules={[
                      { required: true, message: "Test case is required" },
                    ]}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "input"]}
                      rules={[
                        { required: true, message: "Input data is required" },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="Input Data"
                        autoSize={{ minRows: 2 }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "expectedResult"]}
                      rules={[
                        {
                          required: true,
                          message: "Expected result is required",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="Expected Result"
                        autoSize={{ minRows: 2 }}
                      />
                    </Form.Item>
                    <Button
                      onClick={() => remove(field.name)}
                      type="link"
                      danger
                    >
                      Remove
                    </Button>
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  style={{ marginTop: 16 }}
                >
                  Add Test Case
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Submit
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
