import { getGroupPerson } from "api/group.api";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { IGroupPeople } from "types/groupTypes";

import AcceptUserTable from "../AcceptUserTable";
import { handleDataToTable } from "../AcceptUserTable/const";

import { useQuery } from "@tanstack/react-query";

interface PeopleProps {}

const PeopleTab: FC<PeopleProps> = () => {
  const { id } = useParams();
  const { data, refetch } = useQuery<IGroupPeople[]>({
    queryKey: ["GroupPerson", id],
    queryFn: () => getGroupPerson(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return <AcceptUserTable users={handleDataToTable(data, refetch)} />;
};
export default PeopleTab;
