import { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, notification } from "antd";
import { createTask } from "api/group.api";
import { Paths } from "routes/paths";
import { IGroup } from "types/groupTypes";

import { TaskForm } from "./ProblemForm";

import { useMutation } from "@tanstack/react-query";

export type ICreateTaskValues = {
  title: string;
  description: string;
};

const CreateProblemPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>();
  const { mutate } = useMutation<IGroup, Error, ICreateTaskValues>({
    mutationKey: ["CreateProblem"],
    mutationFn: (val: ICreateTaskValues) => createTask(groupId, val),
    onSuccess: () => {
      notification.success({
        message: (
          <FormattedMessage id="create.problem.page.index.notification.message" />
        ),
      });
      navigate(`${Paths.group}/${groupId}`);
    },
  });

  const onFinish = (values: ICreateTaskValues) => {
    mutate(values);
  };

  return (
    <>
      <TaskForm onFinish={onFinish} formRef={formRef} />
      <Form.Item>
        <Button type="primary" onClick={() => formRef.current?.submit()}>
          <FormattedMessage id="create.problem.page.index.create" />
        </Button>
      </Form.Item>
    </>
  );
};

export default CreateProblemPage;
