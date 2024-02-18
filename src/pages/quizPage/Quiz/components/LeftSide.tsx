import { FC } from "react";
import classNames from "classnames";
import { IQuestion } from "types/questionTypes";

import { questionAnswers } from "..";

import styles from "./../styles.module.scss";

import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
interface LeftSideProps {
  title: string;
  questions: IQuestion[];
  setCurrentQuestion: (index: number) => void;
  setCurrentQuestionId: (index: number) => void;
  currentQuestionId: number;
  handleSaveAnswer: () => void;
  isShow: boolean;
  currentQuestionIndex: number;
}

export const LeftSide: FC<LeftSideProps> = ({
  title,
  questions,
  setCurrentQuestion,
  handleSaveAnswer,
  isShow,
  currentQuestionId,
  currentQuestionIndex,
}) => {
  const turnace = (text: string) => {
    return text.length > 41 ? text.substring(0, 40).trimEnd() + "..." : text;
  };

  return (
    <div className={classNames(styles.leftSide, !isShow && styles.hidden)}>
      <div className={styles.leftSide_title}>
        {title} {currentQuestionId}
      </div>
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={classNames(styles.leftSide_questions_block, {
            [styles.active]: currentQuestionIndex === index,
          })}
          onClick={() => {
            handleSaveAnswer();
            setCurrentQuestion(index);
          }}
        >
          <div className={styles.leftSide_questions_index}>{index + 1}</div>
          <div className={styles.leftSide_questions_info}>
            {turnace(question.title)} {question.id}
          </div>
          <div className={styles.leftSide_questions_progressInfo}>
            {!questionAnswers.find((q) => q.questionId === question.id) ||
            questionAnswers
              .find((q) => q.questionId === question.id)
              ?.answers.some((a) => a === -1) ? (
              <ClockCircleTwoTone />
            ) : (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
