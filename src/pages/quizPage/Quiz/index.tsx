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

export const questionAnswers: IQuestionAnswers = [];

const QuizParticipant = () => {
  const { id } = useParams();
  const { isShow, handleToggle } = useModal(true);
  const { data } = useQuery({
    queryKey: ["quizData", id],
    queryFn: () => getQuizWithoutAnswers(id),
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(
    data?.questions[0].id
  );
  useEffect(() => {
    setCurrentQuestionId(data?.questions[0].id);
  }, [data]);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([
    questionAnswers.find((q) => q.questionId === currentQuestionId)
      ?.answers?.[0] || -1,
  ]);

  useEffect(() => {
    const isMultiSelect = data?.questions[currentQuestion]?.isMultiSelect;
    console.log("isMultiSelect", isMultiSelect);
    if (isMultiSelect) {
      setSelectedAnswers(
        questionAnswers.find((q) => q.questionId === currentQuestionId)
          ?.answers || [-1]
      );
    } else {
      setSelectedAnswers([
        questionAnswers.find((q) => q.questionId === currentQuestionId)
          ?.answers?.[0] || -1,
      ]);
    }
  }, [currentQuestion, data?.questions, currentQuestionId]);

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

  useEffect(() => {
    setCurrentQuestionId(data?.questions[currentQuestion].id);
  }, [currentQuestion, data?.questions]);

  const handleSaveAnswer = (answers?: number[]) => {
    const existingAnswerIndex = questionAnswers.findIndex(
      (q) => q.questionId === currentQuestionId
    );

    if (answers?.length == 0) answers = [-1];

    if (existingAnswerIndex !== -1) {
      questionAnswers[existingAnswerIndex] = {
        ...questionAnswers[existingAnswerIndex],
        answers: answers
          ? answers
          : selectedAnswers.length === 0
          ? [-1]
          : selectedAnswers,
      };
    } else {
      questionAnswers.push({
        questionId: currentQuestionId!,
        answers: answers
          ? answers
          : selectedAnswers.length === 0
          ? [-1]
          : selectedAnswers,
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
        currentQuestionIndex={currentQuestion}
        isShow={isShow}
        handleSaveAnswer={handleSaveAnswer}
        setCurrentQuestionId={setCurrentQuestionId}
        currentQuestionId={currentQuestionId!}
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
        handleSaveAnswer={handleSaveAnswer}
      />
    </div>
  );
};

export default QuizParticipant;
