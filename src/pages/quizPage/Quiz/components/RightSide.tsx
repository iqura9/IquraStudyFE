import { FC } from "react";
import { Button, Divider, Progress, Radio } from "antd";
import { IQuestion } from "types/questionTypes";

import styles from "./../styles.module.scss";

import { LeftOutlined } from "@ant-design/icons";
interface AnswerProps {
  text: string;
}

const Answer: FC<AnswerProps> = ({ text }) => {
  return (
    <div className={styles.rightSide_answers_block}>
      <Radio>{text}</Radio>
    </div>
  );
};

interface RightSideProps {
  currentQuestionIndex: number;
  questions: IQuestion[];
  handleToggleLeftSide: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export const RightSide: FC<RightSideProps> = ({
  currentQuestionIndex,
  questions,
  handlePrev,
  handleNext,
  handleToggleLeftSide,
}) => {
  const percent = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100
  );

  return (
    <div className={styles.rightSide}>
      <div className={styles.rightSide_wrapper}>
        <div className={styles.rightSide_container}>
          <div className={styles.rightSide_title}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className={styles.rightSide_question}>
            {questions[currentQuestionIndex]?.title}
          </div>
          {/* Displaying answer options */}
          {questions[currentQuestionIndex]?.answers?.map((answer) => (
            <Answer key={answer.id} text={answer.title} />
          ))}
          {/* Previous and Next buttons */}
          <div className={styles.buttons}>
            <Button
              type="primary"
              onClick={handlePrev}
              disabled={currentQuestionIndex + 1 === 1}
            >
              Prev
            </Button>
            <Button
              type="primary"
              onClick={handleNext}
              disabled={currentQuestionIndex + 1 === questions.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Divider />
        <div className={styles.bottom_group}>
          <Button icon={<LeftOutlined />} onClick={handleToggleLeftSide}>
            List of the questions
          </Button>
          <Progress
            percent={percent}
            status="active"
            strokeColor={{ from: "#108ee9", to: "#87d068" }}
          />
          <Button>Finish</Button>
        </div>
      </div>
    </div>
  );
};
