import React, { FC, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { Button, notification, Space, Table } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { queryClient } from "api/auth.api";
import { deleteTaskQuiz } from "api/task";
import { useAuth } from "contexts/authContext";
import { GroupTaskQuiz } from "types/task";

import { columns, handleDataToTable } from "./helper";

import { useMutation } from "@tanstack/react-query";

interface TaskTableProps {
  quizzes: GroupTaskQuiz[] | undefined;
}

const TaskTable: FC<TaskTableProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { mutate: deleteFn } = useMutation<unknown, Error, number[]>({
    mutationKey: ["deleteTaskQuiz"],
    mutationFn: (data) => deleteTaskQuiz(data),
    onSuccess: () => {
      if (id)
        queryClient.invalidateQueries({
          queryKey: ["getTask", id],
        });
      setSelectedRowKeys([]);
    },
    onError: (error: any) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleClick = () => {
    deleteFn(selectedRowKeys as number[]);
  };

  const hasSelected = selectedRowKeys.length > 0;
  const isTeacher = user?.role === "Teacher";
  return (
    <div>
      <Table
        rowSelection={isTeacher ? rowSelection : undefined}
        dataSource={handleDataToTable(quizzes)}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/quiz/${record.quizId}?taskId=${id}`);
            },
          };
        }}
      />

      {isTeacher && quizzes && quizzes.length > 0 && (
        <Space size={2} style={{ marginTop: "-50px", float: "left" }}>
          <Button
            type="primary"
            danger
            disabled={!hasSelected}
            onClick={handleClick}
          >
            <FormattedMessage id="common.delete" />
          </Button>
        </Space>
      )}
    </div>
  );
};

export default TaskTable;
