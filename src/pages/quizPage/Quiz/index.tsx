import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizWithoutAnswers } from "api/quiz";
import useModal from "hooks/useModal";

import { LeftSide } from "./components/LeftSide";
import { RightSide } from "./components/RightSide";

import styles from "./styles.module.scss";

import { useQuery } from "@tanstack/react-query";

export type IQuestionAnswers = {
  questionId: number;
  answers: number[];
}[];

const questionAnswers: IQuestionAnswers = [];

const QuizParticipant = () => {
  const { id } = useParams();
  const { isShow, handleToggle } = useModal(true);
  const { data } = useQuery({
    queryKey: ["quizData", id],
    queryFn: () => getQuizWithoutAnswers(id),
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(
    questionAnswers.find((q) => q.questionId === currentQuestion)
      ?.answers?.[0] || -1
  );

  useEffect(() => {
    setSelectedAnswer(
      questionAnswers.find((q) => q.questionId === currentQuestion)
        ?.answers?.[0] || -1
    );
  }, [currentQuestion]);

  const handlePrev = () => {
    handleSaveAnswer();
    setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
  };

  const handleNext = () => {
    handleSaveAnswer();
    setCurrentQuestion((prevQuestion) =>
      Math.min(prevQuestion + 1, data?.questions?.length || 0)
    );
  };

  const handleSaveAnswer = () => {
    const existingAnswerIndex = questionAnswers.findIndex(
      (q) => q.questionId === currentQuestion
    );

    if (existingAnswerIndex !== -1) {
      questionAnswers[existingAnswerIndex] = {
        ...questionAnswers[existingAnswerIndex],
        answers: [selectedAnswer],
      };
    } else {
      questionAnswers.push({
        questionId: currentQuestion,
        answers: [selectedAnswer],
      });
    }
  };

  const handleSubmitQuiz = () => {
    handleSaveAnswer();
    const submitData = {
      quizId: id,
      questions: questionAnswers,
    };
    console.log(submitData);
  };

  return (
    <div className={styles.wrapper}>
      <LeftSide
        title={data?.title || ""}
        questions={data?.questions || []}
        setCurrentQuestion={setCurrentQuestion}
        isShow={isShow}
        handleSaveAnswer={handleSaveAnswer}
      />

      <RightSide
        selectedAnswer={selectedAnswer}
        currentQuestionIndex={currentQuestion}
        questions={data?.questions || []}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleToggleLeftSide={handleToggle}
        handleSubmitQuiz={handleSubmitQuiz}
        setSelectedAnswer={setSelectedAnswer}
      />
    </div>
  );
};

export default QuizParticipant;
