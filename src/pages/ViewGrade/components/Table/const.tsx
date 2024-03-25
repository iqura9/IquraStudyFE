import { FormattedMessage } from "react-intl";
import { TableColumnsType } from "antd";
import { ColumnsType } from "antd/es/table";
import { Score } from "types/grades";

interface DataType {
  key: string;
  name: string;
  overall_score: number;
  scores: Score[] | [];
}

export const handleData = (
  dataSource: DataType[]
): TableColumnsType<DataType> => {
  const baseColumns: ColumnsType<DataType> = [
    {
      title: <FormattedMessage id="common.username" />,
      dataIndex: "name",
      key: "name",
      width: "10%",
      align: "left",
    },
    {
      title: <FormattedMessage id="view.grade.page.overall.grade" />,
      dataIndex: "overall_score",
      key: "overall_score",
      width: "20px",
      align: "left",
    },
  ];

  const additionalColumns: ColumnsType<DataType> = Array.from(
    new Set(
      dataSource.flatMap((item) => item.scores?.map((score) => score.taskTitle))
    )
  )
    .filter((taskTitle): taskTitle is string => taskTitle !== undefined)
    .map((taskTitle: string) => ({
      title: taskTitle,
      dataIndex: "scores",
      key: taskTitle,
      width: "100px",
      align: "center",
      render: (scores: Score[]) => {
        const matchingScore = scores.find(
          (score) => score.taskTitle === taskTitle
        );
        return matchingScore
          ? `${matchingScore.received}/${matchingScore.maxScore}`
          : "-";
      },
    }));

  return [...baseColumns, ...additionalColumns];
};
