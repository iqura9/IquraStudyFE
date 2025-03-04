import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "api/index";
import { Participation } from "generated-api/api";

import { useQuery } from "@tanstack/react-query";

export function useGetPerticipation() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const competitionId = searchParams.get("competitionId");
  const taskId = searchParams.get("taskId");
  const rightCompetitionId = competitionId ? Number(competitionId) : Number(id);
  return useQuery<Participation>({
    queryKey: ["apiParicipationCompetitionIdGet", rightCompetitionId],
    queryFn: () =>
      api
        .apiParicipationCompetitionIdGet(rightCompetitionId)
        .then((res) => res.data),
    enabled: !taskId,
  });
}
