export interface CreateQuizTaskDto {
  groupTasksId: number;
  quizIds: number[];
}
export enum TaskType {
  "Test" = "Test",
  "Problem" = "Problem",
}
