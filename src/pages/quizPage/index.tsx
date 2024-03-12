import React from "react";
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
      notification.success({ message: "Quiz successfully was deleted" });
      // queryClient.refetchQueries({ queryKey: ["quizData", id] });
      navigate(Paths.quizzes);
    },
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching quiz data</div>;
  }

  if (!data) return <></>;

  const { title, createdByUser } = data;

  const listData = [
    { label: "Title", value: title },
    { label: "Created By", value: createdByUser.userName },
    {
      label: "Created At",
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
          <Button>Add Questions</Button>
        </Link>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={() => deleteFn()}>Delete</Button>
      </Space>
      <QuestionTable questions={data.questions} />
    </div>
  );
};

export default QuizPage;
