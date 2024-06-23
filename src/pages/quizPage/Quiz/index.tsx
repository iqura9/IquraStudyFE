import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { notification } from "antd";
import { getQuizWithoutAnswers, verifyQuiz } from "api/quiz";
import useModal from "hooks/useModal";
import { IQuestionAnswers, VerificationQuery } from "types/quiz";

import { LeftSide } from "./components/LeftSide";
import { RightSide } from "./components/RightSide";

import styles from "./styles.module.scss";

import { useMutation, useQuery } from "@tanstack/react-query";

export const questionAnswers: IQuestionAnswers = [];

const QuizParticipant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { isShow, handleToggle } = useModal(true);
  const [searchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["quizData", id],
    queryFn: () => getQuizWithoutAnswers(id),
  });

  const { mutate: verifyQuizFn } = useMutation<
    number,
    Error,
    VerificationQuery
  >({
    mutationKey: ["mutationKey"],
    mutationFn: (data: VerificationQuery) => verifyQuiz(data),
    onSuccess: (score: number) => {
      notification.success({
        message: `${formatMessage({ id: "quiz.score" })} ${score}`,
      });
      navigate(-1);
    },
    onError: (error: Error) => {
      notification.error({ message: error.message });
    },
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
      quizId: Number(id),
      taskId: Number(searchParams.get("taskId")),
      questions: questionAnswers,
    };
    verifyQuizFn(submitData);
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
