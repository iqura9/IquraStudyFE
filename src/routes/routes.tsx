import { lazy } from "react";

const HomePage = lazy(() => import("pages/homePage"));
const GroupPage = lazy(() => import("pages/groupPage"));
const GroupsPage = lazy(() => import("pages/groupPage/GroupsPage"));
const CreateGroupPage = lazy(() => import("pages/groupPage/CreateGroupPage"));
const EditGroupPage = lazy(() => import("pages/groupPage/EditGroupPage"));
const UsersPage = lazy(() => import("pages/usersPage"));
const CreateTaskPage = lazy(() => import("pages/taskPage/CreateTask"));
const CreateProblemPage = lazy(() => import("pages/problemPage/CreateProblem"));
const QuizPage = lazy(() => import("pages/quizPage"));
const CreateQuizPage = lazy(() => import("pages/quizPage/CreateQuiz"));
const QuestionPage = lazy(() => import("pages/questionPage"));
const CreateQuestionPage = lazy(
  () => import("pages/questionPage/CreateQuestion")
);
const EditQuestionPage = lazy(() => import("pages/questionPage/EditQuestion"));
const QuizzesPage = lazy(() => import("pages/quizPage/Quizzes"));

interface IAppRoutes {
  component: React.ReactNode;
  path: string;
}

export const appRoutes: IAppRoutes[] = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/home",
    component: <HomePage />,
  },
  {
    path: "/problems",
    component: <HomePage />,
  },
  {
    path: "/teachers",
    component: <HomePage />,
  },
  {
    path: "/group/create",
    component: <CreateGroupPage />,
  },
  {
    path: "/groups",
    component: <GroupsPage />,
  },
  {
    path: "/quizzes",
    component: <QuizzesPage />,
  },
  {
    path: "/edit/group/:id",
    component: <EditGroupPage />,
  },
  {
    path: "/group/:id",
    component: <GroupPage />,
  },
  {
    path: "/create/task/:groupId",
    component: <CreateTaskPage />,
  },
  {
    path: "/problem/create",
    component: <CreateProblemPage />,
  },
  {
    path: "/quiz/create",
    component: <CreateQuizPage />,
  },
  {
    path: "/quizzes/:id",
    component: <QuizPage />,
  },
  {
    path: "/create/question/:quizId",
    component: <CreateQuestionPage />,
  },
  {
    path: "/question/:id",
    component: <QuestionPage />,
  },
  {
    path: "/edit/question/:id",
    component: <EditQuestionPage />,
  },
  {
    path: "/users",
    component: <UsersPage />,
  },
];
