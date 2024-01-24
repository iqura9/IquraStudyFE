import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, notification } from "antd";
import { Button } from "antd";
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
        message: "Task was added",
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
          Create Problem
        </Button>
      </Form.Item>
    </>
  );
};

export default CreateProblemPage;
