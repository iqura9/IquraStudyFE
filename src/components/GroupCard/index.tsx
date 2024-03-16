import React from "react";
import { FormattedMessage } from "react-intl";
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
    {
      key: "1",
      label: <FormattedMessage id="common.name" />,
      value: group.name,
    },
    {
      key: "2",
      label: <FormattedMessage id="group.card.created.by.teacher" />,
      value: group.createdByUser.userName,
    },
    {
      key: "3",
      label: <FormattedMessage id="group.card.created.at" />,
      value: new Date(group.createdAt).toLocaleDateString(),
    },
    {
      key: "4",
      label: <FormattedMessage id="group.card.is.archived" />,
      value: group.isArchived ? "Yes" : "No",
    },
  ];
  const columns: TableProps<any>["columns"] = [
    {
      title: <FormattedMessage id="common.label" />,
      dataIndex: "label",
      key: "label",
      className: styles.firsColumn,
    },
    {
      title: <FormattedMessage id="common.value" />,
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <Link to={groupPath}>
      <Card
        title={<FormattedMessage id="group.card.group.title" />}
        className={styles.Card}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          style={{}}
        />
      </Card>
    </Link>
  );
};

export default GroupDisplay;
