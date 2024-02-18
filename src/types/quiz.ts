export interface CreateQuizTaskDto {
  groupTasksId: number;
  quizIds: number[];
}
export enum TaskType {
  "Test" = "Test",
  "Problem" = "Problem",
}

export type IQuestionAnswers = {
  questionId: number;
  answers: number[];
}[];

export type VerificationQuery = {
  taskId: number;
  quizId: number;
  questions: IQuestionAnswers;
};
