import { FC } from "react";
import { Button, Checkbox, Divider, Progress, Radio, Space } from "antd";
import { IQuestion } from "types/questionTypes";

import styles from "./../styles.module.scss";

import { LeftOutlined } from "@ant-design/icons";

interface RightSideProps {
  currentQuestionIndex: number;
  selectedAnswers: number[];
  questions: IQuestion[];
  handleToggleLeftSide: () => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleSubmitQuiz: () => void;
  setSelectedAnswers: (answers: number[]) => void;
}

export const RightSide: FC<RightSideProps> = ({
  currentQuestionIndex,
  selectedAnswers,
  questions,
  handlePrev,
  handleNext,
  handleToggleLeftSide,
  setSelectedAnswers,
  handleSubmitQuiz,
}) => {
  const isMultiSelect = questions[currentQuestionIndex]?.isMultiSelect;
  const percent = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100
  );

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleChange = (e) => {
    const answers = isMultiSelect ? e : [e.target.value];
    setSelectedAnswers(answers);
  };

  const handleSave = () => {
    if (selectedAnswers !== null) {
      console.log("Selected answer:", selectedAnswers);
      // Here you can perform further actions like saving the question with the selected answer
    } else {
      console.log("Please select an answer");
    }
  };
  console.log("selectedAnswer", selectedAnswers);
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
          {!isMultiSelect ? (
            <div>
              <Radio.Group onChange={handleChange} value={selectedAnswers[0]}>
                <Space direction="vertical">
                  {questions[currentQuestionIndex]?.answers?.map((answer) => (
                    <Radio key={answer.id} value={answer.id}>
                      {answer.title}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          ) : (
            <div>
              <Checkbox.Group onChange={handleChange} value={selectedAnswers}>
                <Space direction="vertical">
                  {questions[currentQuestionIndex]?.answers?.map((answer) => (
                    <Checkbox key={answer.id} value={answer.id}>
                      {answer.title}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </div>
          )}

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
