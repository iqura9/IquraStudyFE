import { FC } from "react";
import { Avatar, Space, Typography } from "antd";
import { IGroup } from "types/groupTypes";

import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface PeopleProps {
  group: IGroup;
}

const MainTab: FC<PeopleProps> = ({ group }) => {
  const { createdByUser, createdAt, isArchived } = group;
  return (
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
      <Space>
        <Text strong>Is Archived: </Text>
        <Text type={isArchived ? "danger" : "success"}>
          {isArchived ? "Yes" : "No"}
        </Text>
      </Space>
    </Space>
  );
};
export default MainTab;
