import { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Button, Form, notification } from "antd";
import { createQuiz } from "api/quiz";
import { Paths } from "routes/paths";
import { IGroup } from "types/groupTypes";

import { QuizForm } from "./QuizForm";

import { useMutation } from "@tanstack/react-query";

export type ICreateQuizValues = {
  title: string;
};

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>();
  const { mutate } = useMutation<IGroup, Error, ICreateQuizValues>({
    mutationKey: ["CreateQuiz"],
    mutationFn: (val: ICreateQuizValues) => createQuiz(val),
    onSuccess: (response) => {
      notification.success({
        message: <FormattedMessage id="crete.quiz.page.notification.success" />,
      });
      navigate(`${Paths.quizzes}/${response.id}`);
    },
  });

  const onFinish = (values: ICreateQuizValues) => {
    mutate(values);
  };

  return (
    <>
      <QuizForm onFinish={onFinish} formRef={formRef} />
      <Form.Item>
        <Button type="primary" onClick={() => formRef.current?.submit()}>
          <FormattedMessage id="create.quiz.page.create.quiz" />
        </Button>
      </Form.Item>
    </>
  );
};

export default CreateQuizPage;
