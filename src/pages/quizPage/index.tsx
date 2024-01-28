import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Descriptions, List, Space } from "antd";
import { getQuiz } from "api/quiz";
import { Paths } from "routes/paths";

import QuestionTable from "./QuestionTable";

import { useQuery } from "@tanstack/react-query";

const QuizPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizData", id],
    queryFn: () => getQuiz(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching quiz data</div>;
  }

  const { title, createdByUser } = data;

  const listData = [
    { label: "Title", value: title },
    { label: "Created By", value: createdByUser.userName },
    {
      label: "Created At",
      value: new Date(createdByUser.createdAt).toLocaleDateString(),
    },
  ];

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
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Space>
      <QuestionTable questions={data.questions} />
    </div>
  );
};

export default QuizPage;
