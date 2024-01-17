import { Header } from "components/Header";
import { useAuth } from "contexts/authContext";
import { LoginPage, RegisterPage } from "pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./requireAuth";
import { appRoutes } from "./routes";

const AppRoutes = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
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
          <Route element={<Header />}>
            {appRoutes.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
