import { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Form, Modal, notification, Select, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { api } from "api/index";
import { getProblems } from "api/problem.api";
import { createQuizTask, getQuizzesSelect } from "api/quiz";
import { CreateCompetitionProblemsDto } from "generated-api/api";
import { IQuiz } from "types/questionTypes";
import { CreateQuizTaskDto } from "types/quiz";

import { useMutation, useQuery } from "@tanstack/react-query";

interface AddTaskModalProps {
  taskId: number | undefined;
  visible: boolean;
  onCancel: () => void;
  isCompetition?: boolean;
}

const AddTaskModal: FC<AddTaskModalProps> = ({
  visible,
  onCancel,
  taskId,
  isCompetition = false,
}) => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  const { data, isLoading, refetch } = useQuery<IQuiz[]>({
    queryKey: ["queryKey", taskId],
    queryFn: () => getQuizzesSelect(taskId),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!taskId,
  });

  const { data: problems, isLoading: isProblemLoading } = useQuery<any[]>({
    queryKey: ["queryKey"],
    queryFn: () => getProblems(),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!taskId,
  });

  const { mutate: createQuizTaskFn } = useMutation<
    unknown,
    Error,
    CreateQuizTaskDto
  >({
    mutationKey: ["createQuizTask", taskId],
    mutationFn: (data) => createQuizTask(data),
    onSuccess: () => {
      form.resetFields();
      refetch();
    },
    onError: (error: any) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const { mutate: addProblemToCompetitionFn } = useMutation<
    void,
    Error,
    CreateCompetitionProblemsDto
  >({
    mutationKey: ["addProblemToCompetition", taskId],
    mutationFn: (data) =>
      api.apiCompetitionProblemsPost(data).then((res) => res.data),
    onSuccess: () => {
      form.resetFields();
      refetch();
    },
    onError: (error: any) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const options: DefaultOptionType[] | undefined = data?.map((quiz) => ({
    label: `${quiz.title} ${formatMessage({ id: "common.by" })} ${
      quiz.createdByUser.userName
    }`,
    value: quiz.id,
  }));

  const problemOptions: DefaultOptionType[] | undefined = problems?.map(
    (problem) => ({
      label: `${problem.title} ${formatMessage({ id: "common.by" })} ${
        problem.user.userName
      }`,
      value: problem.id,
    }),
  );

  const onFinish = (values: { quizIds: number[]; problemIds: number[] }) => {
    if (!taskId) {
      notification.error({
        message: <FormattedMessage id="common.error" />,
        description: <FormattedMessage id="group.page.modal.add.error.desc" />,
      });
    }

    const { quizIds, problemIds } = values;

    if (isCompetition) {
      addProblemToCompetitionFn({
        competitionId: taskId,
        problemIds,
        quizIds,
      });
    } else {
      const sendDto: CreateQuizTaskDto = {
        groupTasksId: taskId!,
        quizIds,
        problemIds,
      };
      createQuizTaskFn(sendDto);
    }

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

          <Form.Item
            label={<FormattedMessage id="group.page.modal.add.problem.label" />}
            name="problemIds"
          >
            <Select
              mode="multiple"
              allowClear
              options={problemOptions}
              style={{ width: "100%" }}
              loading={isProblemLoading}
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
