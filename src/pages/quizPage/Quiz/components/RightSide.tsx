import { FC, useEffect, useState } from "react";
import { Button, Checkbox, Divider, Progress, Radio, Space } from "antd";
import { IQuestion } from "types/questionTypes";

import styles from "./../styles.module.scss";

import { LeftOutlined } from "@ant-design/icons";

interface RightSideProps {
  currentQuestionIndex: number;
  selectedAnswer: number;
  questions: IQuestion[];
  handleToggleLeftSide: () => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleSubmitQuiz: () => void;
  setSelectedAnswer: (answer: number) => void;
}

export const RightSide: FC<RightSideProps> = ({
  currentQuestionIndex,
  selectedAnswer,
  questions,
  handlePrev,
  handleNext,
  handleToggleLeftSide,
  setSelectedAnswer,
  handleSubmitQuiz,
}) => {
  const percent = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100
  );

  // const answers = {
  //   quizId: 1,
  //   questions: [
  //     {
  //       questionId: 2,
  //       answers: [
  //         {
  //           answerId: 2,
  //           isCorrect:true
  //         },
  //         {
  //           answerId: 3,
  //           isCorrect:true
  //         },
  //       ]
  //     },
  //     {
  //       questionId: 3,
  //       answers: [
  //         {
  //           answerId: 4,
  //           isCorrect:true
  //         },
  //       ]
  //     }
  //   ]
  // }

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSave = () => {
    if (selectedAnswer !== null) {
      console.log("Selected answer:", selectedAnswer);
      // Here you can perform further actions like saving the question with the selected answer
    } else {
      console.log("Please select an answer");
    }
  };
  console.log("selectedAnswer", selectedAnswer);
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
          <div>
            <Radio.Group onChange={handleChange} value={selectedAnswer}>
              <Space direction="vertical">
                {questions[currentQuestionIndex]?.answers?.map((answer) => (
                  <Radio key={answer.id} value={answer.id}>
                    {answer.title}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
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
          <Button onClick={handleSubmitQuiz}>Finish</Button>
        </div>
      </div>
    </div>
  );
};
