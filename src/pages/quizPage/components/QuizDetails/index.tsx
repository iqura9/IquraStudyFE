import { Space, Table } from "antd";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
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
      dataIndex: "createdByUser",
      key: "createdByUser",
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
      render: () => (
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
