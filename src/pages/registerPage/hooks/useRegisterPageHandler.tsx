import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { registerUserFn } from "api/auth.api";
import { Paths } from "routes/paths";
import { GenericResponse, IRegisterQuery } from "types/authTypes";

import { useMutation } from "@tanstack/react-query";

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
        message: <FormattedMessage id="register.page.notification.message" />,
        description: <FormattedMessage id="register.page.notification.desc" />,
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
