import React, { FC, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { Card, Space, Tabs, Tag, Typography } from "antd";
import { useAuth } from "contexts/authContext";
import IsShow from "settings/IsShow";
import { IGroup } from "types/groupTypes";

import MainTab from "./MainTab";
import PeopleTab from "./PeopleTab";
import TasksTab from "./TasksTab";

import styles from "./styles.module.scss";

const { Title } = Typography;

const GroupDetails: FC<{ group: IGroup }> = ({ group }) => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "main");

  const { name, createdByUser } = group;

  const items = [
    {
      key: "main",
      label: <FormattedMessage id="group.detail.component.item.main" />,
      children: <MainTab group={group} />,
    },
    {
      key: "tasks",
      label: <FormattedMessage id="group.detail.component.item.tasks" />,
      children: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <TasksTab />
        </Space>
      ),
    },
    {
      key: "people",
      label: <FormattedMessage id="group.detail.component.item.people" />,
      children: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <PeopleTab />
        </Space>
      ),
    },
  ];

  const title = (
    <div className={styles.titleData}>
      <Title level={2}>{name}</Title>
      <IsShow rule={createdByUser.id === user?.id}>
        <Tag color="gold">
          <FormattedMessage id="group.detail.component.title.tag" />
        </Tag>
      </IsShow>
    </div>
  );

  const handleChangeTab = (key: string) => {
    setSearchParams(`?tab=${key}`);
    setActiveTab(key);
  };

  return (
    <div className={styles.groupDetails}>
      <Card title={title}>
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          onChange={handleChangeTab}
          style={{ marginLeft: "auto" }}
          items={items}
        ></Tabs>
      </Card>
    </div>
  );
};

export default GroupDetails;
