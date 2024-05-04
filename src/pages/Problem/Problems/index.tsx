import React from "react";
import { getMeFn } from "api/auth.api";
import { getProblems } from "api/problem.api";
import { getAccessToken } from "helpers/getToken";

import ProblemsTable from "./ProblemsTable";

import { useQuery } from "@tanstack/react-query";

interface ProblemsProps {}

export default function Problems({}: ProblemsProps) {
  const { data } = useQuery<unknown, Error>({
    queryKey: ["getProblens"],
    queryFn: getProblems,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!getAccessToken(),
  });
  console.log(data);
  return <ProblemsTable problems={data} />;
}
