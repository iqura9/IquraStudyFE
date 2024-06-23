import { Key } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useParams } from "react-router-dom";
import { Descriptions, Tag } from "antd";

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
        {answers.map((answer: { id: Key; title: string; isCorrect: any }) => (
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
