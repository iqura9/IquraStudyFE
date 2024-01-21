import React, { FC } from "react";
import { Table } from "antd";
import { IUser } from "types/authTypes";

import { columns } from "./const";

interface UserTableProps {
  users: IUser[] | undefined;
}

export const UserTable: FC<UserTableProps> = ({ users }) => {
  return <Table dataSource={users} columns={columns} />;
};
