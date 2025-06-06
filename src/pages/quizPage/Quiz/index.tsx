import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { notification } from "antd";
import { api } from "api/index";
import { getQuizWithoutAnswers, verifyQuiz } from "api/quiz";
import { AxiosPromise } from "axios";
import { CompetitionQuizVerificationRequest } from "generated-api/api";
import useModal from "hooks/useModal";
import ViewCompetitionSidebar from "pages/Competition/ViewCompetitionSidebar";
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

  const [searchParams] = useSearchParams();
  const competitionId = searchParams.get("competitionId");
  const { isShow, handleToggle } = useModal(competitionId ? false : true);
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

  const { mutate: verifyCompetitionQuizFn } = useMutation<
    number,
    Error,
    CompetitionQuizVerificationRequest
  >({
    mutationKey: ["apiCompetitionVerifyQuizPost"],
    mutationFn: (data: CompetitionQuizVerificationRequest) =>
      api.apiCompetitionVerifyQuizPost(data),
    onSuccess: (res: AxiosPromise<number>) => {
      const score = res.data;
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
    data?.questions[0].id,
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
          ?.answers || [-1],
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
      Math.min(prevQuestion + 1, data?.questions?.length || 0),
    );
  };

  useEffect(() => {
    setCurrentQuestionId(data?.questions[currentQuestion].id);
  }, [currentQuestion, data?.questions]);

  const handleSaveAnswer = (answers?: number[]) => {
    const existingAnswerIndex = questionAnswers.findIndex(
      (q) => q.questionId === currentQuestionId,
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

    const competitionId = searchParams.get("competitionId");
    const participationId = searchParams.get("participationId");
    const taskId = searchParams.get("taskId");

    if (participationId) {
      const submitData = {
        quizId: Number(id),
        competitionId: Number(competitionId),
        participationId: Number(participationId),
        questions: questionAnswers,
      };

      verifyCompetitionQuizFn(submitData);
    } else if (taskId) {
      const submitData = {
        quizId: Number(id),
        taskId: Number(taskId),
        questions: questionAnswers,
      };
      verifyQuizFn(submitData);
    }
  };

  return (
    <ViewCompetitionSidebar isCompetiton={!!competitionId}>
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
    </ViewCompetitionSidebar>
  );
};

export default QuizParticipant;
