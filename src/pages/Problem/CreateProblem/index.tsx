import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MdEditor from "react-markdown-editor-lite";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification, Typography } from "antd";
import { createProblem } from "api/problem.api";
import MarkdownIt from "markdown-it";

import { editorOptions, setEditorTheme } from "../components/CodeBlock";

import { defaultCodeEditorState, defaultTestCodeEditorState } from "./consts";

import "react-markdown-editor-lite/lib/index.css";

import { Editor } from "@monaco-editor/react";
import { useMutation } from "@tanstack/react-query";

const { Title } = Typography;

const mdParser = new MarkdownIt();

const CreateProblemPage = () => {
  const [form] = Form.useForm();
  const [markdownContent, setMarkdownContent] = useState("");
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { mutate: createProblemFn } = useMutation<unknown, Error>({
    mutationKey: ["createProblem"],
    mutationFn: (data) => createProblem(data),
    onSuccess: (res) => {
      console.log(res);
      navigate("/problems");
    },
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const onFinish = (values) => {
    const data = {
      ...values,
      description: markdownContent,
      initFunc: code,
    };
    createProblemFn(data);
  };

  const [code, setCode] = useState(defaultCodeEditorState);

  const handleCodeChange = (codeLines: string | undefined) => {
    codeLines && setCode(codeLines);
  };

  const [selectedLanguage, setSelectedLanguage] = useState("typescript");

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Title level={2}>
        <FormattedMessage id="menu.createProblem" />
      </Title>
      <Form
        form={form}
        name="createProblemForm"
        initialValues={{ description: "" }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label={formatMessage({ id: "group.page.modal.add.problem.label" })}
          name="title"
          rules={[{ required: true, message: "Please enter problem name!" }]}
        >
          <Input placeholder={formatMessage({ id: "enter.problem.name" })} />
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
                    label={`${formatMessage({ id: "test.case" })} ${index + 1}`}
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
                        placeholder={formatMessage({ id: "input.data" })}
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
                        placeholder={formatMessage({ id: "expected.result" })}
                        autoSize={{ minRows: 2 }}
                      />
                    </Form.Item>
                    <Button
                      onClick={() => remove(field.name)}
                      type="link"
                      danger
                    >
                      <FormattedMessage id="common.remove" />
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
                  <FormattedMessage id="add.test.case" />
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item label={formatMessage({ id: "init.func" })} name="initFunc">
          <Editor
            defaultValue={code}
            beforeMount={(monaco) => {
              setEditorTheme(monaco);
            }}
            height={"175px"}
            theme="onedark"
            language={selectedLanguage}
            value={code}
            onChange={handleCodeChange}
            options={editorOptions}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            <FormattedMessage id="common.confirm" />
          </Button>
          <Button
            onClick={() => form.resetFields()}
            style={{ marginLeft: "10px" }}
          >
            <FormattedMessage id="common.reset" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProblemPage;
