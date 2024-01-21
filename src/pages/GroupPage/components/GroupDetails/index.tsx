import React, { FC } from "react";
import { Avatar, Card, Space, Tag, Typography } from "antd";
import { useAuth } from "contexts/authContext";
import { IGroup } from "types/groupTypes";

import styles from "./styles.module.scss";

import { UserOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const GroupDetails: FC<{ group: IGroup }> = ({ group }) => {
  const { user } = useAuth();
  const { name, createdAt, createdByUser, isArchived } = group;

  const title = (
    <div className={styles.titleData}>
      <Title level={2}>{name}</Title>
      {createdByUser.id === user?.id && (
        <Tag color="gold">This is your group</Tag>
      )}
    </div>
  );
  return (
    <div className={styles.groupDetails}>
      <Card title={title}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space>
            <Text strong>Created By:</Text>

            <Space>
              <Avatar src={createdByUser.image} icon={<UserOutlined />} />
              <Text>{createdByUser.userName}</Text>
            </Space>
          </Space>

          <Space>
            <Text strong>Created At:</Text>
            <Text>{new Date(createdAt).toLocaleDateString()}</Text>
          </Space>

          {/* <Text strong>Group Tasks:</Text>
          <List
            dataSource={groupTasks}
            renderItem={(task) => <List.Item>{task}</List.Item>}
          /> */}
          <Space>
            <Text strong>Is Archived: </Text>
            <Text type={isArchived ? "danger" : "success"}>
              {isArchived ? "Yes" : "No"}
            </Text>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default GroupDetails;
