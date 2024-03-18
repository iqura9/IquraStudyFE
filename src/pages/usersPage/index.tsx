import { FormattedMessage } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { Select } from "antd";
import { getUsers } from "api/user.api";
import { RoleType } from "types/authTypes";

import { UserTable } from "./components";
import { roleOptions } from "./const";

import styles from "./styles.module.scss";

import { useQuery } from "@tanstack/react-query";

const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useQuery({
    queryKey: ["getUsers", searchParams.get("userRole")],
    queryFn: () => getUsers(searchParams.get("userRole") as RoleType),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleUserRoleSearch = (val: string) => {
    setSearchParams(`${val ? `?userRole=${val}` : ""}`);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.SelectRow}>
        <Select
          placeholder={<FormattedMessage id="user.page.select.placeholder" />}
          options={roleOptions}
          style={{ width: "500px" }}
          defaultValue={searchParams.get("userRole")}
          onChange={handleUserRoleSearch}
          allowClear
        />
      </div>
      <UserTable users={data} />
    </div>
  );
};

export default UsersPage;
