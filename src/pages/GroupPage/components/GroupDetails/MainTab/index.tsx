import { FC } from "react";
import { FormattedMessage } from "react-intl";
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
        <Text strong>
          <FormattedMessage id="group.detail.component.main.tab.created.by" />:
        </Text>
        <Space>
          <Avatar src={createdByUser.image} icon={<UserOutlined />} />
          <Text>{createdByUser.userName}</Text>
        </Space>
      </Space>
      <Space>
        <Text strong>
          <FormattedMessage id="group.card.is.archived" />:
        </Text>
        <Text>{new Date(createdAt).toLocaleDateString()}</Text>
      </Space>
      <Space>
        <Text strong>
          <FormattedMessage id="group.card.created.at" />:{" "}
        </Text>
        <Text type={isArchived ? "danger" : "success"}>
          {isArchived ? (
            <FormattedMessage id="common.yes" />
          ) : (
            <FormattedMessage id="common.no" />
          )}
        </Text>
      </Space>
    </Space>
  );
};
export default MainTab;
