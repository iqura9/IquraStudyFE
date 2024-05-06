import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { getMeFn } from "api/auth.api";
import { getProblem } from "api/problem.api";
import Spinner from "components/Spinner";
import { getAccessToken } from "helpers/getToken";
import { IUser, IUserResponse } from "types/authTypes";

import { useQuery } from "@tanstack/react-query";

const ProblemContext = createContext<
  Partial<{
    data: any;
  }>
>({});
const { Provider } = ProblemContext;

export const useProblem = () => {
  const context = useContext(ProblemContext);
  if (!context) throw new Error("useAuthState must be used in AuthProvider");

  return context;
};

export const ProblemProvider = (props: any) => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<unknown, Error>({
    queryKey: ["getProblem", id],
    queryFn: () => getProblem(id || ""),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!getAccessToken(),
  });

  if (isLoading) return <Spinner />;

  return (
    <Provider
      value={{
        data,
      }}
      {...props}
    />
  );
};
