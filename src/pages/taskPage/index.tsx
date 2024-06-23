import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { Button } from "antd";
import { getTask } from "api/task";
import { useAuth } from "contexts/authContext";

import TaskTable from "./components/TaskTable";

import styles from "./styles.module.scss";

import { useQuery } from "@tanstack/react-query";

const TaskPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ["getTask", id],
    queryFn: () => getTask(id),
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
  const createdAt = data?.createdAt
    ? new Date(data?.createdAt || "").toLocaleDateString()
    : "";
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_leftGroup}>
            <div className={styles.header_title}>{data?.title}</div>
            <div className={styles.header_info}>
              {data?.createdByUser.userName}, {createdAt}
            </div>
          </div>
          {user?.role === "Teacher" ? (
            <Link to={`/task/view-grade/${id}`}>
              <Button type="default">
                <FormattedMessage id="view.grade.page.view.grade" />
              </Button>
            </Link>
          ) : (
            <div className={styles.header_score}>{data?.averageScore}/100</div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.content_desc}>{data?.description}</div>
          <TaskTable
            quizzes={data?.groupTaskQuizzes}
            problems={data?.groupTaskProblems}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
