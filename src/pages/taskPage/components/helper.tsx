import { Tag } from "antd";
import { TaskType } from "types/quiz";
import { GroupTaskQuiz } from "types/task";

export const columns = [
  {
    title: "Task",
    dataIndex: "task",
    key: "task",
    align: "left" as const,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: TaskType) => (
      <Tag color={type === TaskType.Test ? "green" : "blue"}>{type}</Tag>
    ),
    align: "right" as const,
  },
  {
    title: "Grade",
    dataIndex: "grade",
    key: "grade",
    render: (grade: number | null) => (
      <>
        {typeof grade === "number" ? <Tag color="gold">{grade}/100</Tag> : "-"}
      </>
    ),
    align: "right" as const,
  },
];

export const handleDataToTable = (data: GroupTaskQuiz[] | undefined) => {
  return data?.map((d) => {
    return {
      key: d.id,
      task: d.quiz.title,
      type: TaskType.Test,
      grade: d.score,
      quizId: d.quizId,
    };
  });
};
