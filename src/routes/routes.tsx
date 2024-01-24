import { lazy } from "react";

const HomePage = lazy(() => import("pages/homePage"));
const CreateGroupPage = lazy(() => import("pages/groupPage/CreateGroupPage"));
const GroupPage = lazy(() => import("pages/groupPage"));
const GroupsPage = lazy(() => import("pages/groupPage/GroupsPage"));
const UsersPage = lazy(() => import("pages/usersPage"));
const EditGroupPage = lazy(() => import("pages/groupPage/EditGroupPage"));
const CreateTaskPage = lazy(() => import("pages/taskPage/CreateTask"));
const CreateProblemPage = lazy(() => import("pages/problemPage/CreateProblem"));

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
    path: "/users",
    component: <UsersPage />,
  },
];
