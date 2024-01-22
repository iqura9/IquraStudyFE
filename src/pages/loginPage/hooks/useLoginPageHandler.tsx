import { useLocation, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { loginUserFn } from "api/auth.api";
import { useAuth } from "contexts/authContext";
import { Paths } from "routes/paths";
import { ILoginQuery, ILoginResponse } from "types/authTypes";

import { useMutation } from "@tanstack/react-query";

const useLoginPageHandler = () => {
  const { setAuthStatus } = useAuth();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  const { mutate: loginFn } = useMutation<ILoginResponse, Error, ILoginQuery>({
    mutationKey: ["login"],
    mutationFn: (data) => loginUserFn(data),
    onSuccess: (res) => {
      localStorage.setItem("auth", JSON.stringify(res));
      if (setAuthStatus) {
        setAuthStatus(true);
      }

      navigate(
        locationState?.redirectUrl ? locationState?.redirectUrl : Paths.main
      );

      notification.success({
        message: "Login Successful",
        description: "You have successfully logged in. Welcome!",
      });
    },
    onError: (error) => {
      notification.error({
        message: error.name,
        description: error.message,
      });
    },
  });
  return { loginFn, navigate };
};

export default useLoginPageHandler;
