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
import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { IQuestion } from "types/questionTypes";

interface Props {
  questions: IQuestion[];
}
const { Text } = Typography;

const QuestionTable: React.FC<Props> = ({ questions }) => {
  const navigation = useNavigate();
  const { id } = useParams();

  const { mutate: deleteFn } = useMutation<unknown, Error, number>({
    mutationKey: ["deleteQuestion"],
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      notification.success({
        message: <FormattedMessage id="questions.table.notification.success" />,
      });
      queryClient.refetchQueries({ queryKey: ["quizData", id] });
    },
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const handleEdit = (e: any, item: IQuestion) => {
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

  const handleRowClick = (record: IQuestion) => {
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
                    <FormattedMessage id="common.edit" />
                  </Button>
                  <Button danger onClick={(e) => handleDelete(e, question.id)}>
                    <FormattedMessage id="common.delete" />
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
                      <Tag color="green">
                        <FormattedMessage id="common.correct" />
                      </Tag>
                    ) : (
                      <Tag color="red">
                        <FormattedMessage id="common.incorrect" />
                      </Tag>
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
