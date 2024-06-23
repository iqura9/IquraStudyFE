import { Table } from "antd";
import { useAuth } from "contexts/authContext";
import { FC } from "react";
import { IUser } from "types/authTypes";

import { columns } from "./const";

interface AcceptUserTableProps {
  users: IUser[] | undefined;
}

const AcceptUserTable: FC<AcceptUserTableProps> = ({ users }) => {
  const { user } = useAuth();
  // Hide Accept ability when not a Teacher
  if (user?.role !== "Teacher") {
    columns.splice(-1, 1);
  }

  return <Table dataSource={users} columns={columns} />;
};

export default AcceptUserTable;
