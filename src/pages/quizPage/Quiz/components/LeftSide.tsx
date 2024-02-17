import { FC } from "react";
import classNames from "classnames";
import { IQuestion } from "types/questionTypes";

import styles from "./../styles.module.scss";
interface LeftSideProps {
  title: string;
  questions: IQuestion[];
  setCurrentQuestion: (index: number) => void;
  handleSaveAnswer: () => void;
  isShow: boolean;
}

export const LeftSide: FC<LeftSideProps> = ({
  title,
  questions,
  setCurrentQuestion,
  handleSaveAnswer,
  isShow,
}) => {
  const turnace = (text: string) => {
    return text.length > 41 ? text.substring(0, 40).trimEnd() + "..." : text;
  };

  return (
    <div className={classNames(styles.leftSide, !isShow && styles.hidden)}>
      <div className={styles.leftSide_title}>{title}</div>
      {/* Displaying questions list */}
      {questions.map((question, index) => (
        <div
          key={index}
          className={styles.leftSide_questions_block}
          onClick={() => {
            handleSaveAnswer();
            setCurrentQuestion(index);
          }}
        >
          <div className={styles.leftSide_questions_index}>{index + 1}</div>
          <div className={styles.leftSide_questions_info}>
            {turnace(question.title)}
          </div>
          <div className={styles.leftSide_questions_progressInfo}>icon</div>
        </div>
      ))}
    </div>
  );
};
