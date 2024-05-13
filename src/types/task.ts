import { IUser } from "./authTypes";
import { IQuiz } from "./questionTypes";

export interface GroupTaskQuiz {
  id: number;
  groupTaskId: number;
  quizId: number;
  quiz: IQuiz;
  score: number | null;
}

export interface IGroupTaskProblem {
  groupTaskId: number;
  id: number;
  problemId: number;
  problem: IProblem;
  score: any;
}

export interface IProblem {
  id: number;
  title: string;
  description: string;
  initFunc: string;
  userId: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  grades: any[];
  groupTaskProblems: any[];
  problemRelatedCategories: any[];
  submittions: any[];
  testCases: any[];
}
