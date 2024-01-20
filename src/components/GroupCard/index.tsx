import React from "react";
import { Link } from "react-router-dom";
import { Card, Table, TableProps } from "antd";
import { Paths } from "routes/paths";
import { IGroup } from "types/groupTypes";

import styles from "./styles.module.scss";

interface GroupDisplayProps {
  group: IGroup;
}

const GroupDisplay: React.FC<GroupDisplayProps> = ({ group }) => {
  const groupPath = `${Paths.group}/${group.id}`;

  const dataSource = [
    { key: "1", label: "Name", value: group.name },
    {
      key: "2",
      label: "Created By Teacher",
      value: group.createdByUser.userName,
    },
    {
      key: "3",
      label: "Created At",
      value: new Date(group.createdAt).toLocaleDateString(),
    },
    { key: "4", label: "Is Archived", value: group.isArchived ? "Yes" : "No" },
  ];
  const columns: TableProps<any>["columns"] = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      className: styles.firsColumn,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  // move to group details page
  // const handleEdit = (e: any) => {
  //   e.preventDefault();
  //   const editURL = `${Paths.editGroup}/${group.id}`;
  //   navigate(editURL);
  // };

  return (
    <Link to={groupPath}>
      <Card title="Group Details" className={styles.Card}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          style={{}}
        />
        {/* <Button
          type="primary"
          block
          style={{ marginTop: "16px" }}
          onClick={handleEdit}
        >
          Edit
        </Button> */}
      </Card>
    </Link>
  );
};

export default GroupDisplay;
