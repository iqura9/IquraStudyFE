import React, { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Alert, Spin, Table } from "antd";
import { api } from "api/index";

import { useQuery } from "@tanstack/react-query";

const ScoreboardTab: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  // Fetch scoreboard data
  const { data, isLoading, error } = useQuery({
    queryKey: ["getScore", id],
    queryFn: () =>
      api
        .apiCompetitionScoreboardCompetitionIdGet(
          Number(id),
          Number(searchParams.get("groupId")),
        )
        .then((res) => res.data),
  });

  // Define table columns
  const columns = useMemo(() => {
    if (!data) return [];

    // Dynamically generate columns for problems
    const problemColumns =
      Array.isArray(data.userScores[0]?.problems) &&
      data.userScores[0].problems.map((problem: any) => ({
        title: problem.title || `Problem ${problem.problemId}`,
        dataIndex: `problem_${problem.problemId}`,
        key: `problem_${problem.problemId}`,
        align: "center",
      }));

    // Dynamically generate columns for quizzes
    const quizColumns =
      Array.isArray(data.userScores[0]?.quizzes) &&
      data.userScores[0].quizzes.map((quiz: any) => ({
        title: quiz.title || `Quiz ${quiz.quizId}`,
        dataIndex: `quiz_${quiz.quizId}`,
        key: `quiz_${quiz.quizId}`,
        align: "center",
      }));

    return [
      {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
        align: "center",
      },
      {
        title: "Participant",
        dataIndex: "userName",
        key: "userName",
        align: "center",
      },
      {
        title: "Total Score",
        dataIndex: "totalScore",
        key: "totalScore",
        align: "center",
      },
      ...(problemColumns || []), // Add problem columns if available
      ...(quizColumns || []), // Add quiz columns if available
    ];
  }, [data]);

  // Transform API data into dataSource
  const dataSource = useMemo(() => {
    if (!data) return [];

    return data.userScores.map((user: any, index: number) => {
      // Map problem scores into the row
      const problemScores = Array.isArray(user.problems)
        ? user.problems.reduce((acc: any, problem: any) => {
            acc[`problem_${problem.problemId}`] = problem.score;
            return acc;
          }, {})
        : {};

      // Map quiz scores into the row
      const quizScores = Array.isArray(user.quizzes)
        ? user.quizzes.reduce((acc: any, quiz: any) => {
            acc[`quiz_${quiz.quizId}`] = quiz.score;
            return acc;
          }, {})
        : {};

      return {
        key: user.userId,
        rank: index + 1,
        userName: user.userName,
        totalScore: user.totalScore,
        ...problemScores,
        ...quizScores,
      };
    });
  }, [data]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Alert
          message="Error"
          description="Failed to load scoreboard."
          type="error"
        />
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
};

export default ScoreboardTab;
