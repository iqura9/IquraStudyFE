import { TaskType } from "types/quiz";
import { GroupTaskQuiz, IGroupTaskProblem } from "types/task";

export const handleDataToTable = (
  quizzes: GroupTaskQuiz[] | undefined,
  problems: IGroupTaskProblem[] | undefined
) => {
  const quizzesData =
    quizzes?.map((q) => ({
      key: `${q.id}#q`,
      task: q.quiz.title,
      type: TaskType.Test,
      grade: q.score,
      id: q.quizId,
    })) ?? [];

  const problemsData =
    problems?.map((p) => ({
      key: `${p.id}#p`,
      task: p.problem.title,
      type: TaskType.Problem,
      grade: p.score,
      id: p.problemId,
    })) ?? [];

  return [...quizzesData, ...problemsData];
};
