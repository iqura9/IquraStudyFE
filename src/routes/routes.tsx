import { lazy } from "react";
import Problems from "pages/Problem/Problems";
import EditQuizPage from "pages/quizPage/EditQuiz";

const HomePage = lazy(() => import("pages/homePage"));
const GroupPage = lazy(() => import("pages/groupPage"));
const GroupsPage = lazy(() => import("pages/groupPage/GroupsPage"));
const CreateGroupPage = lazy(() => import("pages/groupPage/CreateGroupPage"));
const EditGroupPage = lazy(() => import("pages/groupPage/EditGroupPage"));
const UsersPage = lazy(() => import("pages/usersPage"));
const CreateTaskPage = lazy(() => import("pages/taskPage/CreateTask"));
const CreateProblemPage = lazy(
  () => import("pages/Problem/CreateProblem/index"),
);
const QuizPage = lazy(() => import("pages/quizPage"));
const CreateQuizPage = lazy(() => import("pages/quizPage/CreateQuiz"));
const QuestionPage = lazy(() => import("pages/questionPage"));
const CreateQuestionPage = lazy(
  () => import("pages/questionPage/CreateQuestion"),
);
const EditQuestionPage = lazy(() => import("pages/questionPage/EditQuestion"));
const QuizzesPage = lazy(() => import("pages/quizPage/Quizzes"));
const TaskPage = lazy(() => import("pages/taskPage"));
const QuizParticipant = lazy(() => import("pages/quizPage/Quiz"));
const ViewGradePage = lazy(() => import("pages/ViewGrade"));
const ProblemPage = lazy(() => import("pages/Problem"));

const CreateCompetitionPage = lazy(() => import("pages/Competition/Create"));
const CompetitionPage = lazy(() => import("pages/Competition"));
const CompetitionDetailPage = lazy(
  () => import("pages/Competition/DetailsPage"),
);
interface IAppRoutes {
  component: React.ReactNode;
  path: string;
}

export const appRoutes: IAppRoutes[] = [
  {
    path: "/",
    component: <GroupsPage />,
  },
  {
    path: "/home",
    component: <GroupsPage />,
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
  {
    path: "/task/:id",
    component: <TaskPage />,
  },
  {
    path: "/quiz/edit/:id",
    component: <EditQuizPage />,
  },
  {
    path: "/task/view-grade/:id",
    component: <ViewGradePage />,
  },
  {
    path: "/problem/create",
    component: <CreateProblemPage />,
  },
  {
    path: "/problems",
    component: <Problems />,
  },
  {
    path: "/competition",
    component: <CompetitionPage />,
  },
  {
    path: "/competition/:id",
    component: <CompetitionDetailPage />,
  },
  {
    path: "/create/competition",
    component: <CreateCompetitionPage />,
  },
];

export const outRouters: IAppRoutes[] = [
  {
    path: "/quiz/:id",
    component: <QuizParticipant />,
  },
  {
    path: "/problem/:id",
    component: <ProblemPage />,
  },
];
