import { lazy } from "react";

const HomePage = lazy(() => import("pages/homePage"));
const CreateGroupPage = lazy(() => import("pages/GroupPage/CreateGroupPage"));
const GroupsPage = lazy(() => import("pages/GroupPage/GroupsPage"));
const MyGroupsPage = lazy(() => import("pages/GroupPage/MyGroupsPage"));

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
    component: <MyGroupsPage />,
  },
];
