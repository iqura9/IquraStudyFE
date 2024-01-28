import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space, Table } from "antd";

interface Answer {
  id: number;
  title: string;
}

interface Question {
  id: number;
  title: string;
  quizId: number;
  createdAt: string;
  answers: Answer[];
}

interface Props {
  questions: Question[];
}

const QuestionTable: React.FC<Props> = ({ questions }) => {
  const navigation = useNavigate();

  const handleEdit = (item: Question) => {
    // Handle edit logic here
    console.log("Edit question:", item);
    navigation(`/edit/question/${item.id}`, { state: { data: item } });
  };

  const handleDelete = (item: Question) => {
    // Handle delete logic here
    console.log("Delete question:", item);
  };

  const handleRowClick = (record: Question) => {
    // Navigate to the question details page
    navigation(`/question/${record.id}`, { state: { data: record } });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // Add a custom onClick event for row navigation
      onCell: (record: Question) => ({
        onClick: () => {
          handleRowClick(record);
        },
      }),
    },
    {
      title: "Change",
      dataIndex: "Change",
      key: "Change",
      render: (text: any, record: Question) => (
        <Space key="actions">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={questions} columns={columns} />;
};

export default QuestionTable;
