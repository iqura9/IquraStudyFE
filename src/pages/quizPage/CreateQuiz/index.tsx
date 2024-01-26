import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Store } from "rc-field-form/lib/interface";

interface QuizFormData {
  title: string;
  description: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswers: string[];
}

const CreateQuizPage: React.FC<{
  onSave: (data: QuizFormData) => void;
}> = ({ onSave }) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values: Store) => {
        onSave(values as QuizFormData);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <Form form={form} onFinish={handleSave} layout="vertical">
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Potential Answers">
        <Form.Item
          name="answer1"
          rules={[{ required: true, message: "Please enter answer 1" }]}
        >
          <Input placeholder="Answer 1" />
        </Form.Item>
        <Form.Item
          name="answer2"
          rules={[{ required: true, message: "Please enter answer 2" }]}
        >
          <Input placeholder="Answer 2" />
        </Form.Item>
        <Form.Item
          name="answer3"
          rules={[{ required: true, message: "Please enter answer 3" }]}
        >
          <Input placeholder="Answer 3" />
        </Form.Item>
        <Form.Item
          name="answer4"
          rules={[{ required: true, message: "Please enter answer 4" }]}
        >
          <Input placeholder="Answer 4" />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Correct Answers" name="correctAnswers">
        <Checkbox.Group>
          <Checkbox value="answer1">Answer 1</Checkbox>
          <Checkbox value="answer2">Answer 2</Checkbox>
          <Checkbox value="answer3">Answer 3</Checkbox>
          <Checkbox value="answer4">Answer 4</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

const QuizPageContainer: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizFormData[]>([]);

  const handleSave = (data: QuizFormData) => {
    setQuizData([...quizData, data]);
  };

  return (
    <div>
      <h1>Quiz Page</h1>
      <CreateQuizPage onSave={handleSave} />
      <div>
        <h2>Saved Quiz Options:</h2>
        {quizData.map((quiz, index) => (
          <div key={index}>
            <p>Title: {quiz.title}</p>
            <p>Description: {quiz.description}</p>
            {/* ... display other quiz data */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPageContainer;
