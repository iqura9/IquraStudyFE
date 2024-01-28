export interface IQuestion {
  id: number;
  title: string;
  quizId: number;
  createdAt: string;
  updatedAt: string;
  answers: IAnswer[];
}

interface IAnswer {
  id: number;
  title: string;
  questionId: number;
  isCorrect: boolean;
}
