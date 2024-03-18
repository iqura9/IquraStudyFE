import React, { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, notification, Result, Typography } from "antd";
import { Button } from "antd";
import { updateQuestion } from "api/quiz";
import { Paths } from "routes/paths";
import { IQuestion } from "types/questionTypes";

import { QuestionForm } from "../CreateQuestion/QuestionForm";

import { useMutation } from "@tanstack/react-query";

export type ICreateQuestionValues = {
  title: string;
};
const { Text } = Typography;

const EditQuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>();
  const { state } = useLocation();
  const { formatMessage } = useIntl();
  const data = state?.data;
  const { mutate } = useMutation<IQuestion, Error, IQuestion>({
    mutationKey: ["UpdateQuestion", id],
    mutationFn: (val: IQuestion) => updateQuestion(id, val),
    onSuccess: (response) => {
      notification.success({
        message: formatMessage({
          id: "edit.question.page.notification.message",
        }),
      });
      console.log(response);
      navigate(`${Paths.quizzes}/${response.quizId}`);
    },
  });

  const onFinish = (values: IQuestion) => {
    data.title = values.title;
    data.answers = values.answers;
    mutate(data);
  };

  const handleBack = () => {
    navigate("/home");
  };

  if (!data) {
    const boldText = formatMessage({ id: "edit.question.page.bold.text" });
    return (
      <Result
        status="info"
        title={<FormattedMessage id="edit.question.page.title" />}
        subTitle={
          <>
            <>{boldText.slice(0, 34)}</>
            <Text strong>{boldText.slice(34)}</Text>
          </>
        }
        extra={
          <Button type="primary" onClick={handleBack}>
            <FormattedMessage id="edit.question.page.go.home" />
          </Button>
        }
      />
    );
  }
  return (
    <>
      <QuestionForm
        onFinish={onFinish}
        formRef={formRef}
        initialValues={state?.data}
      />
      <Form.Item>
        <Button type="primary" onClick={() => formRef.current?.submit()}>
          <FormattedMessage id="edit.question.page.edit.question" />
        </Button>
      </Form.Item>
    </>
  );
};

export default EditQuestionPage;
