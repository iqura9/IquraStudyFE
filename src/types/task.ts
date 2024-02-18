import { IQuiz } from "./questionTypes";

export interface GroupTaskQuiz {
  id: number;
  groupTaskId: number;
  quizId: number;
  quiz: IQuiz;
  score: number | null;
}
