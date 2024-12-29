import { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, notification } from "antd";
import { createQuestion } from "api/quiz";
import { ICreateQuizValues } from "pages/quizPage/CreateQuiz";
import { Paths } from "routes/paths";
import { IQuestion } from "types/questionTypes";

import { QuestionForm } from "./QuestionForm";

import { useMutation } from "@tanstack/react-query";

export type ICreateQuestionValues = {
  title: string;
};

const CreateQuestionPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>();
  const { mutate } = useMutation<IQuestion, Error, ICreateQuestionValues>({
    mutationKey: ["CreateQuestion", quizId],
    mutationFn: (val: ICreateQuestionValues) => createQuestion(quizId, val),
    onSuccess: (response) => {
      notification.success({
        message: (
          <FormattedMessage id="create.question.index.notification.success" />
        ),
      });
      navigate(`${Paths.quizzes}/${response.quizId}`);
    },
  });

  const onFinish = (values: ICreateQuizValues) => {
    mutate(values);
  };

  return (
    <>
      <QuestionForm onFinish={onFinish} formRef={formRef} />
      <Form.Item>
        <Button type="primary" onClick={() => formRef.current?.submit()}>
          <FormattedMessage id="create.question.index.create.question" />
        </Button>
      </Form.Item>
    </>
  );
};

export default CreateQuestionPage;
