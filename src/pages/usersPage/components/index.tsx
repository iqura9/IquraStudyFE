import { Table } from "antd";
import { UserInfo } from "generated-api/api";

import { columns } from "./const";

interface UserTableProps {
  users: UserInfo[] | undefined;
}

export function UserTable({ users }: UserTableProps) {
  return <Table dataSource={users} columns={columns} />;
}
