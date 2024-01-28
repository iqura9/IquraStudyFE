import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Descriptions, Tag } from "antd";
import { getQuestion } from "api/quiz";

import { useQuery } from "@tanstack/react-query";

const QuestionPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { data } = state;

  if (!data) {
    return <div>Loading...</div>;
  }

  const { title, answers, createdAt } = data;

  return (
    <div>
      <Descriptions title={`Question ${id}`} bordered>
        <Descriptions.Item label="Title">{title}</Descriptions.Item>
        <Descriptions.Item label="Created At">{createdAt}</Descriptions.Item>
      </Descriptions>

      <h3>Answers:</h3>
      <ul>
        {answers.map((answer) => (
          <li key={answer.id}>
            {answer.title} -{" "}
            {answer.isCorrect ? (
              <Tag color="green">Correct</Tag>
            ) : (
              <Tag color="red">Incorrect</Tag>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionPage;
