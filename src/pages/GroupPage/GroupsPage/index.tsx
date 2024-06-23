import { useSearchParams } from "react-router-dom";
import { getAllGroups } from "api/group.api";
import GroupDisplay from "components/GroupCard";

import styles from "./styles.module.scss";

import { useQuery } from "@tanstack/react-query";

const GroupsPage = () => {
  const [searchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["getGroups", searchParams.get("myGroups")],
    queryFn: () => getAllGroups(!!searchParams.get("myGroups")),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.Wrapper}>
      <div className={styles.GroupWrapper}>
        {data?.map((group) => (
          <GroupDisplay key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
