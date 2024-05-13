import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getProblem, getProblemSubmittion } from "api/problem.api";
import Spinner from "components/Spinner";
import { getAccessToken } from "helpers/getToken";

import { useQuery } from "@tanstack/react-query";

const ProblemContext = createContext<
  Partial<{
    data: any;
    setSubmittionStatus: (val: boolean | undefined) => void;
    submittionStatus: boolean | undefined;
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
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useQuery<unknown, Error>({
    queryKey: ["getProblem", id],
    queryFn: () => getProblem(id || ""),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!getAccessToken(),
  });

  const { data: problemSubmitted } = useQuery<unknown, Error>({
    queryKey: ["getProblemSubmitted", id],
    queryFn: () =>
      getProblemSubmittion(searchParams.get("taskId") || "", id || ""),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!getAccessToken(),
  });

  console.log(problemSubmitted);

  const [submittionStatus, setSubmittionStatus] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setSubmittionStatus(
      problemSubmitted?.[0]?.sourceCode === null
        ? undefined
        : problemSubmitted?.[0]?.score === 100
    );
  }, [problemSubmitted]);

  if (isLoading) return <Spinner />;

  return (
    <Provider
      value={{
        setSubmittionStatus,
        submittionStatus,
        data: {
          ...data,
          initFunc: problemSubmitted?.[0]?.sourceCode ?? data.initFunc,
        },
      }}
      {...props}
    />
  );
};
