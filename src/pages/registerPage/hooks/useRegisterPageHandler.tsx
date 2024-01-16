import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { registerUserFn } from "api/auth.api";
import { useNavigate } from "react-router-dom";
import { Paths } from "routes/paths";
import { GenericResponse, IRegisterQuery } from "types/authTypes";

const useRegisterPageHandler = () => {
  const navigate = useNavigate();
  const { mutate: registerFn } = useMutation<
    GenericResponse,
    Error,
    IRegisterQuery
  >({
    mutationKey: ["register"],
    mutationFn: (data) => registerUserFn(data),
    onSuccess: () => {
      navigate(Paths.login);
      notification.success({
        message: "User created successfully!",
        description: "Log in",
      });
    },
    onError: (error) => {
      notification.error({
        message: error.name,
        description: error.message,
      });
    },
  });
  return { registerFn };
};

export default useRegisterPageHandler;
