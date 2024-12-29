import React from "react";
import { Table } from "antd";

const scoreboardData = [
  {
    key: "1",
    rank: 1,
    participant: "Ali.qurbanov00",
    country: "Azerbaijan",
    results: { A: 100, B: 100, C: 100, D: 100, E: 100, F: 100, G: 140, H: 100 },
  },
  {
    key: "2",
    rank: 1,
    participant: "nhant",
    country: "Vietnam",
    results: { A: 100, B: 100, C: 100, D: 100, E: 100, F: 100, G: 140, H: 100 },
  },
];

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "Participant",
    dataIndex: "participant",
    key: "participant",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "A",
    dataIndex: ["results", "A"],
    key: "A",
  },
  {
    title: "B",
    dataIndex: ["results", "B"],
    key: "B",
  },
  {
    title: "C",
    dataIndex: ["results", "C"],
    key: "C",
  },
  {
    title: "D",
    dataIndex: ["results", "D"],
    key: "D",
  },
  {
    title: "E",
    dataIndex: ["results", "E"],
    key: "E",
  },
  {
    title: "F",
    dataIndex: ["results", "F"],
    key: "F",
  },
  {
    title: "G",
    dataIndex: ["results", "G"],
    key: "G",
  },
  {
    title: "H",
    dataIndex: ["results", "H"],
    key: "H",
  },
];

const ScoreboardTab: React.FC = () => {
  return (
    <Table
      columns={columns}
      dataSource={scoreboardData}
      bordered
      pagination={false}
    />
  );
};

export default ScoreboardTab;
