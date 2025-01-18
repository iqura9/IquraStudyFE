import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { notification } from "antd";
import { api } from "api/index";

import { useMutation } from "@tanstack/react-query";

export function useJoinCompetition() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  return useMutation<void, Error>({
    mutationKey: ["joinCompetition"],
    mutationFn: () => {
      return api
        .apiParicipationPost(Number(searchParams.get("groupId")), Number(id))
        .then((res) => res.data);
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
