import { getProblems } from "api/problem.api";
import LinkButton from "components/LinkButton";
import { getAccessToken } from "helpers/getToken";
import { useRole } from "hooks/useRole";
import styled from "styled-components";

import ProblemsTable from "./ProblemsTable";

import { useQuery } from "@tanstack/react-query";

const ButtonWrapper = styled("div")({
  display: "flex",
  marginBottom: 12,
  justifyContent: "flex-end",
});

export default function Problems() {
  const { data } = useQuery<any[], Error>({
    queryKey: ["getProblens"],
    queryFn: getProblems,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!getAccessToken(),
  });

  const { isTeacher } = useRole();

  return (
    <div>
      {isTeacher ? (
        <ButtonWrapper>
          <LinkButton
            to="/problem/create"
            formattedMessageId="menu.createProblem"
          />
        </ButtonWrapper>
      ) : null}
      <ProblemsTable problems={data!} />
    </div>
  );
}
