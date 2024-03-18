import React from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, List, notification, Space } from "antd";
import { deleteQuiz, getQuiz } from "api/quiz";
import { Paths } from "routes/paths";

import QuestionTable from "./QuestionTable";

import { useMutation, useQuery } from "@tanstack/react-query";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizData", id],
    queryFn: () => getQuiz(id),
  });

  const { mutate: deleteFn } = useMutation<unknown, Error>({
    mutationKey: ["deleteQuiz"],
    mutationFn: () => deleteQuiz(id),
    onSuccess: () => {
      notification.success({
        message: <FormattedMessage id="quiz.page.index.notification.success" />,
      });
      navigate(Paths.quizzes);
    },
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  if (isLoading) {
    return (
      <div>
        <FormattedMessage id="common.loading" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <FormattedMessage id="quiz.page.index.notification.error" />
      </div>
    );
  }

  if (!data) return <></>;

  const { title, createdByUser } = data;

  const listData = [
    { label: <FormattedMessage id="common.title" />, value: title },
    {
      label: <FormattedMessage id="common.created.by" />,
      value: createdByUser.userName,
    },
    {
      label: <FormattedMessage id="common.created.at" />,
      value: new Date(createdByUser.createdAt).toLocaleDateString(),
    },
  ];
  const handleEdit = () => {
    navigate(`/quiz/edit/${id}`, { state: { title } });
  };
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.label} description={item.value} />
          </List.Item>
        )}
      />
      <Space>
        <Link to={`${Paths.createQuestion}/${id}`}>
          <Button>
            <FormattedMessage id="quiz.page.index.add.questions" />
          </Button>
        </Link>
        <Button onClick={handleEdit}>
          <FormattedMessage id="common.edit" />
        </Button>
        <Button onClick={() => deleteFn()}>
          <FormattedMessage id="common.delete" />
        </Button>
      </Space>
      <QuestionTable questions={data.questions} />
    </div>
  );
};

export default QuizPage;
