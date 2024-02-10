import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Radio, Typography } from "antd";
import { getQuizWithoutAnswers } from "api/quiz";
import useModal from "hooks/useModal";
import { IQuestion } from "types/questionTypes";

import { LeftSide } from "./components/LeftSide";
import { RightSide } from "./components/RightSide";

import styles from "./styles.module.scss";

import { useQuery } from "@tanstack/react-query";

const QuizParticipant = () => {
  const { id } = useParams();
  const { isShow, handleToggle } = useModal(true);
  const { data } = useQuery({
    queryKey: ["quizData", id],
    queryFn: () => getQuizWithoutAnswers(id),
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handlePrev = () => {
    setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) =>
      Math.min(prevQuestion + 1, data?.questions?.length || 0)
    );
  };

  return (
    <div className={styles.wrapper}>
      <LeftSide
        title={data?.title || ""}
        questions={data?.questions || []}
        setCurrentQuestion={setCurrentQuestion}
        isShow={isShow}
      />

      <RightSide
        currentQuestionIndex={currentQuestion}
        questions={data?.questions || []}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleToggleLeftSide={handleToggle}
      />
    </div>
  );
};

export default QuizParticipant;
