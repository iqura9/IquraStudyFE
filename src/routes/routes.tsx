import { lazy } from "react";

const HomePage = lazy(() => import("pages/homePage"));
const CreateGroupPage = lazy(() => import("pages/groupPage/CreateGroupPage"));
const GroupPage = lazy(() => import("pages/groupPage"));
const GroupsPage = lazy(() => import("pages/groupPage/GroupsPage"));
const MyGroupsPage = lazy(() => import("pages/groupPage/MyGroupsPage"));
const UsersPage = lazy(() => import("pages/usersPage"));
const EditGroupPage = lazy(() => import("pages/groupPage/EditGroupPage"));

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
    path: "/settings",
    component: <MyGroupsPage />,
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
    path: "/users",
    component: <UsersPage />,
  },
];
