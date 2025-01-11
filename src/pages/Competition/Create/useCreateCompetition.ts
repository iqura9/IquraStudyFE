import { notification } from "antd";
import { api } from "api/index";
import { Competition } from "generated-api/api";

import { useMutation } from "@tanstack/react-query";

export function useCreateCompetition() {
  const {
    mutate: createCompetition,
    isPending,
    isSuccess,
    isError,
  } = useMutation<Competition, Error, Competition>({
    mutationKey: ["createCompetition"],
    mutationFn: (data: Competition) => {
      return api.apiCompetitionPost(data).then((res) => res.data);
    },
    onSuccess: (res) => {
      notification.success({
        message: "Competition created successfully",
        description: `Competition ${res.title} has been created.`,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Error Creating Competition",
        description: error.message,
      });
    },
  });

  return {
    createCompetition,
    isPending,
    isSuccess,
    isError,
  };
}
