import React from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useParams } from "react-router-dom";
import { Descriptions, Tag } from "antd";
import { getQuestion } from "api/quiz";

import { useQuery } from "@tanstack/react-query";

const QuestionPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { data } = state;

  if (!data) {
    return (
      <div>
        <FormattedMessage id="common.loading" />
      </div>
    );
  }

  const { title, answers, createdAt } = data;

  return (
    <div>
      <Descriptions
        title={`${(<FormattedMessage id="questions.page.question" />)} ${id}`}
        bordered
      >
        <Descriptions.Item label={<FormattedMessage id="common.title" />}>
          {title}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <FormattedMessage id="group.detail.component.accept.item.createdAt" />
          }
        >
          {createdAt}
        </Descriptions.Item>
      </Descriptions>

      <h3>
        <FormattedMessage id="questions.page.answers" />:
      </h3>
      <ul>
        {answers.map((answer) => (
          <li key={answer.id}>
            {answer.title} -{" "}
            {answer.isCorrect ? (
              <Tag color="green">
                <FormattedMessage id="common.correct" />
              </Tag>
            ) : (
              <Tag color="red">
                <FormattedMessage id="common.incorrect" />
              </Tag>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionPage;
