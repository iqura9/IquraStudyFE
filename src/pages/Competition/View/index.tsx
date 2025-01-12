import React from "react";
import { Card, Layout, List, Menu, Progress, Typography } from "antd";
import styled from "styled-components";

import {
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  NumberOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const StyledLayout = styled(Layout)({
  minHeight: "100vh",
  backgroundColor: "#1E1E1E",
});

const StyledSider = styled(Sider)({
  backgroundColor: "#1E1E1E",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const SidebarHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "16px",
  color: "#fff",
});

const StyledProgress = styled(Progress)({
  marginTop: "8px",
  "& .ant-progress-bg": {
    backgroundColor: "#4cafb5",
  },
});

const MenuWrapper = styled("div")({
  marginTop: "24px",
});

const FooterWrapper = styled("div")({
  marginTop: "auto",
  paddingTop: "16px",
  borderTop: "1px solid #333",
  textAlign: "center",
  color: "#8c8c8c",
});

const StyledMenu = styled(Menu)({
  backgroundColor: "transparent",
  border: "none",
  "& .ant-menu-item": {
    borderRadius: "8px",
    marginBottom: "8px",
  },
  "& .ant-menu-item-selected": {
    backgroundColor: "#333",
    color: "#4cafb5",
  },
  "& .ant-menu-item:hover": {
    backgroundColor: "#333",
    color: "#4cafb5",
  },
  "& .ant-menu-title-content": {
    color: "#fff",
  },
});

const StyledContent = styled(Content)({
  padding: "24px",
  backgroundColor: "#1E1E1E",
});

const StyledCard = styled(Card)({
  backgroundColor: "#2C2C2C",
  color: "#fff",
  marginBottom: "16px",
  borderRadius: "8px",
  ".ant-card-body": {
    padding: "16px",
  },
});

const ViewCompetition: React.FC = () => {
  const remainingTime = "16:32:32";
  const quizzes = [
    { id: 1, title: "Quiz 1", status: "Not Submitted" },
    { id: 2, title: "Quiz 2", status: "In Progress" },
  ];
  const problems = [
    { id: 1, title: "Problem A", status: "Not Submitted" },
    { id: 2, title: "Problem B", status: "Submitted" },
  ];

  return (
    <StyledLayout>
      <StyledSider width={250}>
        <SidebarHeader>
          <TrophyOutlined style={{ fontSize: "48px", color: "#4cafb5" }} />
          <Title level={4} style={{ color: "#fff", margin: "16px 0 8px" }}>
            Test Name
          </Title>
          <Text style={{ color: "#8c8c8c" }}>Бали</Text>
          <StyledProgress percent={0} showInfo={false} />
          <Text style={{ color: "#fff", marginTop: "8px" }}>0 / 100</Text>
          <Text style={{ color: "#8c8c8c", marginTop: "16px" }}>
            Залишок часу
          </Text>
          <StyledProgress percent={50} showInfo={false} />
          <Text style={{ color: "#fff", marginTop: "8px" }}>
            {remainingTime}
          </Text>
        </SidebarHeader>

        <MenuWrapper>
          <StyledMenu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Головна
            </Menu.Item>
            <Menu.Item key="2" icon={<NumberOutlined />}>
              Цифри
            </Menu.Item>
            <Menu.Item key="3" icon={<MailOutlined />}>
              Запитання
            </Menu.Item>
          </StyledMenu>
        </MenuWrapper>

        <FooterWrapper>
          <InfoCircleOutlined
            style={{ fontSize: "18px", marginBottom: "8px" }}
          />
          <Text style={{ display: "block", fontSize: "12px" }}>
            Про сайт Повідом.
          </Text>
        </FooterWrapper>
      </StyledSider>

      <Layout>
        <StyledContent>
          <StyledCard>
            <Title level={4} style={{ color: "#fff", marginBottom: "16px" }}>
              Quizzes
            </Title>
            <List
              dataSource={quizzes}
              renderItem={(item) => (
                <List.Item
                  style={{
                    backgroundColor: "#3A3A3A",
                    marginBottom: "8px",
                    borderRadius: "8px",
                  }}
                >
                  <List.Item.Meta
                    title={<Text style={{ color: "#fff" }}>{item.title}</Text>}
                    description={
                      <Text style={{ color: "#8c8c8c" }}>{item.status}</Text>
                    }
                  />
                </List.Item>
              )}
            />
          </StyledCard>

          <StyledCard>
            <Title level={4} style={{ color: "#fff", marginBottom: "16px" }}>
              Problems
            </Title>
            <List
              dataSource={problems}
              renderItem={(item) => (
                <List.Item
                  style={{
                    backgroundColor: "#3A3A3A",
                    marginBottom: "8px",
                    borderRadius: "8px",
                  }}
                >
                  <List.Item.Meta
                    title={<Text style={{ color: "#fff" }}>{item.title}</Text>}
                    description={
                      <Text style={{ color: "#8c8c8c" }}>{item.status}</Text>
                    }
                  />
                </List.Item>
              )}
            />
          </StyledCard>
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default ViewCompetition;
