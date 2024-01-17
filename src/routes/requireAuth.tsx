import { useAuth } from "contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
