import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "components/Navigation";
import { useAuth } from "contexts/authContext";

import RequireAuth from "./requireAuth";
import { appRoutes } from "./routes";

const LoginPage = lazy(() => import("pages/loginPage"));
const RegisterPage = lazy(() => import("pages/registerPage"));

const AppRoutes = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuth ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route element={<RequireAuth />}>
            <Route element={<Navigation />}>
              {appRoutes.map(({ path, component }) => (
                <Route key={path} path={path} element={component} />
              ))}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
