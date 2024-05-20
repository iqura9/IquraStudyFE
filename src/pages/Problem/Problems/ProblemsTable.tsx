import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Space, Table } from "antd";
import { IUser } from "types/authTypes";
import { IQuiz } from "types/questionTypes";

import {
  DeleteOutlined,
  EditOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";

type QuizTableProps = {
  problems: any[];
};

const ProblemsTable: FC<QuizTableProps> = ({ problems }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: <FormattedMessage id="quiz.details.columns.id" />,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <FormattedMessage id="common.title" />,
      dataIndex: "title",
      key: "title",
    },
    {
      title: <FormattedMessage id="common.created.by" />,
      dataIndex: "user",
      key: "user",
      render: (text: IUser) => <div>{text.userName}</div>,
    },
    {
      title: <FormattedMessage id="common.created.at" />,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: <FormattedMessage id="quiz.details.columns.actions" />,
      key: "actions",
      render: (_: any) => (
        <Space size="middle">
          <RadarChartOutlined style={{ color: "blue" }} />
          <EditOutlined style={{ color: "blue" }} />
          <DeleteOutlined style={{ color: "red" }} />
        </Space>
      ),
    },
  ];
  const handleRowClick = (record: IQuiz) => {
    navigate(`/problem/${record.id}`);
  };

  return (
    <Table
      onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      dataSource={problems}
      columns={columns}
    />
  );
};

export default ProblemsTable;
