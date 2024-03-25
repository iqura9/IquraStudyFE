import React, { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Button,
  Checkbox,
  Form,
  Modal,
  notification,
  Select,
  Space,
} from "antd";
import form from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";
import { createQuizTask, getQuizzesSelect } from "api/quiz";
import { IQuiz } from "types/questionTypes";
import { CreateQuizTaskDto } from "types/quiz";

import { useMutation, useQuery } from "@tanstack/react-query";

interface AddTaskModalProps {
  taskId: number | undefined;
  visible: boolean;
  onCancel: () => void;
}

const AddTaskModal: FC<AddTaskModalProps> = ({ visible, onCancel, taskId }) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  // #TODO get all quizzes that are no setted, add filter, only my tasks
  const { data, isLoading, refetch } = useQuery<IQuiz[]>({
    queryKey: ["queryKey", taskId],
    queryFn: () => getQuizzesSelect(taskId),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!taskId,
  });

  const { mutate: mutationFn } = useMutation<unknown, Error, CreateQuizTaskDto>(
    {
      mutationKey: ["createQuizTask", taskId],
      mutationFn: (data) => createQuizTask(data),
      onSuccess: (data: any) => {
        form.resetFields();
        refetch();
      },
      onError: (error: any) => {
        // Your error handling logic here
      },
    }
  );

  const options: DefaultOptionType[] | undefined = data?.map((quiz) => ({
    label: `${quiz.title} ${formatMessage({ id: "common.by" })} ${
      quiz.createdByUser.userName
    }`,
    value: quiz.id,
  }));

  const onFinish = (values: { quizIds: number[] }) => {
    if (!taskId) {
      notification.error({
        message: <FormattedMessage id="common.error" />,
        description: <FormattedMessage id="group.page.modal.add.error.desc" />,
      });
    }

    const { quizIds } = values;
    console.log("Form values:", values);
    const sendDto: CreateQuizTaskDto = {
      groupTasksId: taskId!,
      quizIds,
    };
    mutationFn(sendDto);
    onCancel();
  };

  return (
    <Modal
      title={<FormattedMessage id="group.page.modal.add.title" />}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
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
