import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "contexts/authContext";

const RequireAuth = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
