import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { api } from "api/index";

import { useMutation } from "@tanstack/react-query";

export function useJoinCompetition() {
  const { id } = useParams();
  const navigation = useNavigate();
  return useMutation<void, Error>({
    mutationKey: ["joinCompetition"],
    mutationFn: () => {
      return api.apiParicipationPost(Number(id)).then((res) => res.data);
    },
    onSuccess: () => {
      navigation(`/competition/view/${id}`);
    },
    onError: (error) => {
      notification.error({
        message: "Error Creating Competition",
        description: error.message,
      });
    },
  });
}
