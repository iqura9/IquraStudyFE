import React, { FC } from "react";
import { Table } from "antd";
import { GroupTaskQuiz } from "types/task";

import { columns, handleDataToTable } from "./helper";

interface TaskTableProps {
  quizzes: GroupTaskQuiz[] | undefined;
}

const TaskTable: FC<TaskTableProps> = ({ quizzes }) => {
  return <Table dataSource={handleDataToTable(quizzes)} columns={columns} />;
};

export default TaskTable;
