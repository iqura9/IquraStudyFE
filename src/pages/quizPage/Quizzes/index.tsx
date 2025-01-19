import { FormattedMessage } from "react-intl";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import { getQuizzes } from "api/quiz";
import LinkButton from "components/LinkButton";
import { useRole } from "hooks/useRole";
import styled from "styled-components";

import QuizTable from "../components/QuizDetails";

import styles from "./styles.module.scss";

import { useQuery } from "@tanstack/react-query";

const ButtonWrapper = styled("div")({
  display: "flex",
  marginBottom: 12,
  justifyContent: "flex-end",
});

function QuizzesPage() {
  const [searchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["getQuizzes", searchParams.get("myQuizzes")],
    queryFn: getQuizzes,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { isTeacher } = useRole();

  return (
    <div className={styles.Wrapper}>
      {isTeacher ? (
        <ButtonWrapper>
          <LinkButton to="/quiz/create" formattedMessageId="menu.createQuiz" />
        </ButtonWrapper>
      ) : null}

      <QuizTable quizzes={data} />
    </div>
  );
}

export default QuizzesPage;
