import { useAuth } from "contexts/authContext";
import { LoginPage, RegisterPage } from "pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { appRoutes } from "./routes";

const AppRoutes = () => {
  const { isAuth } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isAuth ? "/" : "/login"} />} />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" /> : <RegisterPage />}
        />
        {appRoutes.map(({ path, component }) => (
          <Route path={path} element={component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
