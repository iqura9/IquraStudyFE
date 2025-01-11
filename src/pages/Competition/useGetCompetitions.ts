import { api } from "api/index";

import { useQuery } from "@tanstack/react-query";

export function useGetCompetitions() {
  return useQuery({
    queryKey: ["getCompetitions"],
    queryFn: () => api.apiCompetitionGet().then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
  });
}
