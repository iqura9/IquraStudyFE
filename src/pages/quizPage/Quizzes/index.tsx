import React from "react";
import { useSearchParams } from "react-router-dom";
import { Select } from "antd";
import { getQuizzes } from "api/quiz";

import QuizTable from "../components/QuizDetails";

import { SelectQuizzesOptions } from "./const";

import styles from "./styles.module.scss";

import { useQuery } from "@tanstack/react-query";

const QuizzesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["getQuizzes", searchParams.get("myQuizzes")],
    queryFn: getQuizzes,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleChangeGroup = (val: string) => {
    setSearchParams(val ? `?myQuizzes=${val}` : "");
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.FiltersWrapper}>
        <Select
          className={styles.Select}
          options={SelectQuizzesOptions}
          placeholder={"Select group filter"}
          allowClear
          onChange={handleChangeGroup}
        />
      </div>
      <QuizTable quizzes={data} />
    </div>
  );
};

export default QuizzesPage;
