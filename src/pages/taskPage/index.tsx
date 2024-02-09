import React from "react";
import { useParams } from "react-router-dom";
import { getTask } from "api/task";

import TaskTable from "./components/TaskTable";

import styles from "./styles.module.scss";

import { useQuery } from "@tanstack/react-query";

const TaskPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["getTask", id],
    queryFn: () => getTask(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_leftGroup}>
            <div className={styles.header_title}>{data?.title}</div>
            <div className={styles.header_info}>
              {data?.createdByUser.userName}, 4 dec 2023
            </div>
          </div>
          <div className={styles.header_score}>0/100</div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_desc}>{data?.description}</div>
          <TaskTable quizzes={data?.groupTaskQuizzes} />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
