import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "contexts/authContext";

const RequireAuth = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ redirectUrl: `${location.pathname}${location.search}` }}
    />
  );
};

export default RequireAuth;
