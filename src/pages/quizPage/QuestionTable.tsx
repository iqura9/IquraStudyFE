import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  List,
  notification,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { queryClient } from "api/auth.api";
import { deleteQuestion } from "api/quiz";

import { useMutation } from "@tanstack/react-query";

interface Answer {
  id: number;
  title: string;
  isCorrect: string;
}

interface Question {
  id: number;
  title: string;
  quizId: number;
  createdAt: string;
  answers: Answer[];
}

interface Props {
  questions: Question[];
}
const { Text } = Typography;

const QuestionTable: React.FC<Props> = ({ questions }) => {
  const navigation = useNavigate();
  const { id } = useParams();

  const { mutate: deleteFn } = useMutation<unknown, Error, number>({
    mutationKey: ["deleteQuestion"],
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      notification.success({ message: "Question successfully was deleted" });
      queryClient.refetchQueries({ queryKey: ["quizData", id] });
    },
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const handleEdit = (e: any, item: Question) => {
    // Handle edit logic here
    e.preventDefault();
    e.stopPropagation();
    console.log("Edit question:", item);
    navigation(`/edit/question/${item.id}`, { state: { data: item } });
  };

  const handleDelete = (e: any, id: number) => {
    // Handle delete logic here
    e.preventDefault();
    e.stopPropagation();
    deleteFn(id);
  };

  const handleRowClick = (record: Question) => {
    // Navigate to the question details page
    navigation(`/question/${record.id}`, { state: { data: record } });
  };

  return (
    <div>
      <List
        dataSource={questions}
        renderItem={(question) => (
          <List.Item onClick={() => handleRowClick(question)}>
            <Card
              title={question.title}
              style={{ width: "100%" }}
              extra={
                <Space>
                  <Button
                    type="primary"
                    onClick={(e) => handleEdit(e, question)}
                  >
                    Edit
                  </Button>
                  <Button danger onClick={(e) => handleDelete(e, question.id)}>
                    Delete
                  </Button>
                </Space>
              }
            >
              <List>
                {question.answers.map((answer, index) => (
                  <Row
                    key={answer.id}
                    justify="space-between"
                    align="middle"
                    style={{ marginBottom: 8 }}
                  >
                    <Text>
                      <Tag>{index + 1}</Tag>
                      {answer.title}
                    </Text>

                    {answer.isCorrect ? (
                      <Tag color="green">Correct</Tag>
                    ) : (
                      <Tag color="red">Incorrect</Tag>
                    )}
                  </Row>
                ))}
              </List>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuestionTable;
