import React from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Button, Space, Typography } from "antd";
import useModal from "hooks/useModal";
import { useRole } from "hooks/useRole";
import AddTaskModal from "pages/groupPage/components/Modal/AddTaskModal";

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
  const { id } = useParams();
  const { isTeacher } = useRole();
  const { isShow, handleShowModal, handleHideModal } = useModal();
  const handleAddTask = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    handleShowModal();
  };
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
        {isTeacher ? (
          <Button type="link" onClick={(e) => handleAddTask(e)}>
            <FormattedMessage id="group.detail.component.task.tab.add" />
          </Button>
        ) : null}
      </Space>
      <AddTaskModal
        visible={isShow}
        onCancel={handleHideModal}
        taskId={Number(id)}
        isCompetition
      />
    </Header>
  );
};

export default CompetitionHeader;
