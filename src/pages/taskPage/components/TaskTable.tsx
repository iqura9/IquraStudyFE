import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "antd";
import { GroupTaskQuiz } from "types/task";

import { columns, handleDataToTable } from "./helper";

interface TaskTableProps {
  quizzes: GroupTaskQuiz[] | undefined;
}

const TaskTable: FC<TaskTableProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Table
      dataSource={handleDataToTable(quizzes)}
      columns={columns}
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`/quiz/${record.key}?taskId=${id}`);
          },
        };
      }}
    />
  );
};

export default TaskTable;
