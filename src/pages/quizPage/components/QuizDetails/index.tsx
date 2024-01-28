import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Table } from "antd";
import { IUser } from "types/authTypes";
import { IQuiz } from "types/questionTypes";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type QuizTableProps = {
  quizzes: IQuiz[];
};

const QuizTable: FC<QuizTableProps> = ({ quizzes }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created By",
      dataIndex: "createdByUser",
      key: "createdByUser",
      render: (text: IUser) => <div>{text.userName}</div>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IQuiz) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} />
          <DeleteOutlined style={{ color: "red" }} />
        </Space>
      ),
    },
  ];
  const handleRowClick = (record: IQuiz) => {
    navigate(`/quizzes/${record.id}`);
  };

  return (
    <Table
      onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      dataSource={quizzes}
      columns={columns}
    />
  );
};

export default QuizTable;
