import React, { FC } from "react";
import { Button, Checkbox, Col, Form, Row } from "antd";
import { Input } from "antd";
import { IQuestion } from "types/questionTypes";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface QuestionFormProps {
  onFinish: (values: IQuestion) => void;
  formRef: any;
  initialValues?: IQuestion;
}

export const QuestionForm: FC<QuestionFormProps> = ({
  onFinish,
  formRef,
  initialValues,
}) => {
  return (
    <Form
      name="createQuestionForm"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      ref={formRef}
      initialValues={initialValues}
      layout="vertical"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.List name="answers" initialValue={[{}, {}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Row gutter={8} key={key}>
                <Col span={12}>
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    //fieldKey={[fieldKey, "title"]}
                    label={`Answer ${key + 1}`}
                    rules={[{ required: true, message: "Answer is required" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "isCorrect"]}
                    valuePropName="checked"
                  >
                    <Checkbox>Is Correct?</Checkbox>
                  </Form.Item>
                </Col>
                {/* Hidden fields */}
                <Form.Item
                  {...restField}
                  style={{ display: "none" }}
                  name={[name, "questionId"]}
                >
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  style={{ display: "none" }}
                  name={[name, "id"]}
                >
                  <Input type="hidden" />
                </Form.Item>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Answer
              </Button>
              {fields.length > 2 && (
                <Button
                  type="dashed"
                  onClick={() => remove(fields.length - 1)}
                  icon={<MinusOutlined />}
                >
                  Remove Last Answer
                </Button>
              )}
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
