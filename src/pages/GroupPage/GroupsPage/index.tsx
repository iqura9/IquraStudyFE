import React from "react";
import { useSearchParams } from "react-router-dom";
import { Select } from "antd";
import { getAllGroups } from "api/group.api";
import GroupDisplay from "components/GroupCard";

import { SelectGroupOptions } from "./const";

import styles from "./styles.module.scss";

import { useQuery } from "@tanstack/react-query";

const GroupsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["getGroups", searchParams.get("myGroups")],
    queryFn: () => getAllGroups(!!searchParams.get("myGroups")),
    retry: false,
    refetchOnWindowFocus: false,
  });
  console.log(location.search);
  const handleChangeGroup = (val: string) => {
    setSearchParams(val ? `?myGroups=${val}` : "");
  };

  return (
    <div className={styles.Wrapper}>
      {/* hidden due to disinterestedness */}
      {/* <div className={styles.FiltersWrapper}>
        <Select
          className={styles.Select}
          options={SelectGroupOptions}
          placeholder={"Select group filter"}
          allowClear
          onChange={handleChangeGroup}
        />
      </div> */}
      <div className={styles.GroupWrapper}>
        {data?.map((group) => (
          <GroupDisplay key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
