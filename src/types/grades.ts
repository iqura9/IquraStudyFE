export interface IViewGrade {
  key: string;
  name: string;
  overall_score: number;
  scores: Score[] | [];
}

export interface Score {
  createdDate: string;
  taskTitle: string;
  maxScore: number;
  received: number;
}
