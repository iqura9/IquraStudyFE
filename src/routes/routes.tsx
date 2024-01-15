import { LoginPage } from "pages";

interface IAppRoutes {
  component: React.ReactNode;
  path: string;
}

export const appRoutes: IAppRoutes[] = [
  {
    component: <LoginPage />,
    path: "/login",
  },
];
