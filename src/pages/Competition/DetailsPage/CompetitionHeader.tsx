import React from "react";
import { Button, Space, Typography } from "antd";

import {
  BannerImage,
  Header,
  HeaderTextContainer,
  StyledButton,
  VirtualText,
} from "./styled";

import {
  CalendarOutlined,
  PlusOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface CompetitionHeaderProps {
  banner: string;
  title: string;
  date: string;
  virtual: string;
}

const CompetitionHeader: React.FC<CompetitionHeaderProps> = ({
  banner,
  title,
  date,
  virtual,
}) => {
  return (
    <Header>
      <Space>
        <BannerImage src={banner} alt="competition banner" />
        <HeaderTextContainer>
          <Title level={3} style={{ margin: 0 }}>
            {title}
          </Title>
          <Space>
            <CalendarOutlined style={{ color: "#1890ff" }} />
            <Text>{date}</Text>
          </Space>
          <VirtualText>{virtual}</VirtualText>
        </HeaderTextContainer>
      </Space>
      <Space>
        <Button icon={<ShareAltOutlined />}>Share</Button>
        <StyledButton type="primary" icon={<PlusOutlined />}>
          Join
        </StyledButton>
      </Space>
    </Header>
  );
};

export default CompetitionHeader;
