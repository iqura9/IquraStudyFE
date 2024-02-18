import { FC } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Progress,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd";
import ValidateModal from "components/Modal/ValidateModal";
import useModal from "hooks/useModal";
import { IQuestion } from "types/questionTypes";

import { questionAnswers } from "..";

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
  handleSaveAnswer: (answers: number[]) => void;
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
  handleSaveAnswer,
}) => {
  const { isShow, handleShowModal, handleHideModal } = useModal();

  const isMultiSelect = questions[currentQuestionIndex]?.isMultiSelect;
  const percent = Math.round(
    (questionAnswers.filter((q) => !q.answers.includes(-1)).length /
      questions.length) *
      100
  );

  const handleChange = (e: RadioChangeEvent | number[]) => {
    const answers = isMultiSelect
      ? (e as number[])
      : [(e as RadioChangeEvent).target.value];
    setSelectedAnswers(answers);
    handleSaveAnswer(answers);
  };

  const handleConfirm = () => {
    handleHideModal();
    handleSubmitQuiz();
  };

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
            <Radio.Group onChange={handleChange} value={selectedAnswers[0]}>
              <Space
                direction="vertical"
                className={styles.radioGroupWrapper}
                size={12}
              >
                {questions[currentQuestionIndex]?.answers?.map((answer) => (
                  <Radio
                    key={answer.id}
                    value={answer.id}
                    className={styles.radioWrapper}
                  >
                    {answer.title}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          ) : (
            <Checkbox.Group onChange={handleChange} value={selectedAnswers}>
              <Space
                direction="vertical"
                className={styles.radioGroupWrapper}
                size={12}
              >
                {questions[currentQuestionIndex]?.answers?.map((answer) => (
                  <Checkbox
                    key={answer.id}
                    value={answer.id}
                    className={styles.radioWrapper}
                  >
                    {answer.title}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          )}

          {/* Previous and Next buttons */}
          <div className={styles.buttons}>
            <Button
              type="primary"
              onClick={handlePrev}
              disabled={currentQuestionIndex + 1 === 1}
              size="large"
            >
              Previous
            </Button>
            <Button
              type="primary"
              onClick={handleNext}
              disabled={currentQuestionIndex + 1 === questions.length}
              size="large"
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
          <Button onClick={handleShowModal}>Finish</Button>
        </div>
      </div>
      <ValidateModal
        visible={isShow}
        onConfirm={handleConfirm}
        onCancel={handleHideModal}
        title="Are you sure want to submit the test?"
        subTitle="After submission you cannot pass the test again "
      />
    </div>
  );
};
