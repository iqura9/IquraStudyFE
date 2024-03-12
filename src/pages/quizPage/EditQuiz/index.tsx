import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Form, notification } from "antd";
import { updateQuiz } from "api/quiz";
import { Paths } from "routes/paths";
import { IGroup } from "types/groupTypes";

import { ICreateQuizValues } from "../CreateQuiz";
import { QuizForm } from "../CreateQuiz/QuizForm";

import { useMutation } from "@tanstack/react-query";

export type IEditQuizPageValues = {
  title: string;
};

const EditQuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const formRef = useRef<HTMLFormElement>();
  const { mutate } = useMutation<IGroup, Error, IEditQuizPageValues>({
    mutationKey: ["UpdateQuiz", id],
    mutationFn: (val: IEditQuizPageValues) => updateQuiz(val, id || ""),
    onSuccess: () => {
      notification.success({
        message: "Quiz was updated",
      });
      navigate(`${Paths.quizzes}/${id}`);
    },
  });

  const onFinish = (values: ICreateQuizValues) => {
    mutate(values);
  };

  return (
    <>
      <QuizForm onFinish={onFinish} formRef={formRef} initialValues={state} />
      <Form.Item>
        <Button type="primary" onClick={() => formRef.current?.submit()}>
          Update Quiz
        </Button>
      </Form.Item>
    </>
  );
};

export default EditQuizPage;
