import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { Form, notification } from "antd";
import { Button } from "antd";
import { createTask } from "api/group.api";
import { Paths } from "routes/paths";
import { IGroup } from "types/groupTypes";

import { TaskForm } from "./TaskFrom";

import { useMutation } from "@tanstack/react-query";

export type ICreateTaskValues = {
  title: string;
  description: string;
};

const CreateTaskPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>();
  const { mutate } = useMutation<IGroup, Error, ICreateTaskValues>({
    mutationKey: ["CreateTask", groupId],
    mutationFn: (val: ICreateTaskValues) => createTask(groupId, val),
    onSuccess: () => {
      notification.success({
        message: <FormattedMessage id="task.page.task.was.added" />,
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
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" onClick={() => formRef.current?.submit()}>
          <FormattedMessage id="task.page.create.task" />
        </Button>
      </Form.Item>
    </>
  );
};

export default CreateTaskPage;
