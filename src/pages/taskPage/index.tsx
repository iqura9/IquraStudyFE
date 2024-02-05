import React from "react";
import { useParams } from "react-router-dom";

import styles from "./styles.module.scss";

const TaskPage = () => {
  const { id } = useParams();
  return <div className={styles.wrapper}>ds</div>;
};

export default TaskPage;
