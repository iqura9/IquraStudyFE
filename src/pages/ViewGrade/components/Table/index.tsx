import React from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import { getTaskGrade } from "api/task";

import { handleData } from "./const";

import { useQuery } from "@tanstack/react-query";

export const ScoreTable = () => {
  const { id } = useParams();
  const {
    data: dataSource,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getTaskGrade", id],
    queryFn: () => getTaskGrade(id),
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading)
    return (
      <p>
        <FormattedMessage id="common.loading" />
      </p>
    );
  if (error)
    return (
      <p>
        <FormattedMessage id="common.error" />: {error.message}
      </p>
    );
  if (!dataSource) return <></>;

  return (
    <Table
      dataSource={dataSource}
      columns={handleData(dataSource)}
      scroll={{ x: true }}
    />
  );
};
