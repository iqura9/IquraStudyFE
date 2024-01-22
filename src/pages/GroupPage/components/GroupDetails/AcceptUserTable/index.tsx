import React, { FC } from "react";
import { Table } from "antd";
import { IUser } from "types/authTypes";

import { columns } from "./const";

interface AcceptUserTableProps {
  users: IUser[] | undefined;
}

const AcceptUserTable: FC<AcceptUserTableProps> = ({ users }) => {
  return <Table dataSource={users} columns={columns} />;
};

export default AcceptUserTable;
