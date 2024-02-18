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
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([
    questionAnswers.find((q) => q.questionId === currentQuestion)
      ?.answers?.[0] || -1,
  ]);

  useEffect(() => {
    const isMultiSelect = data?.questions[currentQuestion]?.isMultiSelect;
    if (isMultiSelect) {
      setSelectedAnswers(
        questionAnswers.find((q) => q.questionId === currentQuestion)
          ?.answers || [-1]
      );
    } else {
      setSelectedAnswers([
        questionAnswers.find((q) => q.questionId === currentQuestion)
          ?.answers?.[0] || -1,
      ]);
    }
  }, [currentQuestion, data?.questions]);

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
    console.log(selectedAnswers);

    if (existingAnswerIndex !== -1) {
      questionAnswers[existingAnswerIndex] = {
        ...questionAnswers[existingAnswerIndex],
        answers: selectedAnswers,
      };
    } else {
      questionAnswers.push({
        questionId: currentQuestion,
        answers: selectedAnswers,
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
        selectedAnswers={selectedAnswers}
        currentQuestionIndex={currentQuestion}
        questions={data?.questions || []}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleToggleLeftSide={handleToggle}
        handleSubmitQuiz={handleSubmitQuiz}
        setSelectedAnswers={setSelectedAnswers}
      />
    </div>
  );
};

export default QuizParticipant;
