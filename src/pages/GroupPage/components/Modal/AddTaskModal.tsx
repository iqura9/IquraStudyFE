import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Checkbox,
  Form,
  Modal,
  notification,
  Select,
  Space,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import { createQuizTask, getQuizzes } from "api/quiz";
import { IQuiz } from "types/questionTypes";
import { CreateQuizTaskDto } from "types/quiz";

import { useMutation, useQuery } from "@tanstack/react-query";

interface AddTaskModalProps {
  taskId: number | undefined;
  visible: boolean;
  onCancel: () => void;
}

const AddTaskModal: FC<AddTaskModalProps> = ({ visible, onCancel, taskId }) => {
  // #TODO get all quizzes that are no setted, add filter, only my tasks
  const { data, isLoading } = useQuery<IQuiz[]>({
    queryKey: ["queryKey"],
    queryFn: () => getQuizzes(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutationFn } = useMutation<unknown, Error, CreateQuizTaskDto>(
    {
      mutationKey: ["createQuizTask", taskId],
      mutationFn: (data) => createQuizTask(data),
      onSuccess: (data: any) => {
        // Your success logic here
        console.log(data);
      },
      onError: (error: any) => {
        // Your error handling logic here
      },
    }
  );

  const options: DefaultOptionType[] | undefined = data?.map((quiz) => ({
    label: `${quiz.title} ${(<FormattedMessage id="by" />)} ${
      quiz.createdByUser.userName
    }`,
    value: quiz.id,
  }));

  const onFinish = (values: { quizIds: number[] }) => {
    // values contains the form field values

    if (!taskId) {
      notification.error({
        message: <FormattedMessage id="common.error" />,
        description: <FormattedMessage id="TaskID is not valid" />,
      });
    }

    const { quizIds } = values;
    console.log("Form values:", values);
    const sendDto: CreateQuizTaskDto = {
      groupTasksId: taskId!,
      quizIds,
    };
    mutationFn(sendDto);
    // Perform additional logic or API calls here
    onCancel(); // Close the modal after handling form submission
  };

  return (
    <Modal
      title={<FormattedMessage id="group.page.modal.add.title" />}
      visible={visible}
      onCancel={onCancel}
      footer={null} // Hide the default footer
    >
      <Form onFinish={onFinish}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            label={<FormattedMessage id="group.page.modal.add.label" />}
            name="quizIds"
          >
            <Select
              mode="multiple"
              allowClear
              options={options}
              style={{ width: "100%" }}
              loading={isLoading}
            />
          </Form.Item>

          <Checkbox>
            <FormattedMessage id="group.page.modal.checkbox" />
          </Checkbox>

          <div style={{ textAlign: "right" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="common.ok" />
              </Button>
            </Form.Item>
          </div>
        </Space>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
