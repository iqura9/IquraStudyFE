import { api } from "api/index";

import { useQuery } from "@tanstack/react-query";

export function useGetCompetitionById(id: number) {
  return useQuery({
    queryKey: ["getCompetition", id],
    queryFn: () => api.apiCompetitionIdGet(id).then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
  });
}
