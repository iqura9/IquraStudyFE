import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { loginUserFn } from "api/auth.api";
import { useNavigate } from "react-router-dom";
import { Paths } from "routes/paths";
import { ILoginQuery, ILoginResponse } from "types/authTypes";

const useLoginPageHandler = () => {
  const navigate = useNavigate();
  const { mutate: loginFn } = useMutation<ILoginResponse, Error, ILoginQuery>({
    mutationKey: ["login"],
    mutationFn: (data) => loginUserFn(data),
    onSuccess: (res) => {
      localStorage.setItem("auth", JSON.stringify(res));
      navigate(Paths.main);
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
