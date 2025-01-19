import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Layout, List, Menu, Progress, Typography } from "antd";
import { getMeFn } from "api/auth.api";
import { api } from "api/index";
import Spinner from "components/Spinner";
import { Participation } from "generated-api/api";
import { getAccessToken } from "helpers/getToken";
import styled from "styled-components";
import { IUserResponse } from "types/authTypes";

import NotParticipantPage from "./NotParticipantPage";
import { ParticipationTimer } from "./ParticipationTimer";
import { TimeUpPage } from "./TimeUpPAge";

import {
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  NumberOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";

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

function ViewCompetition() {
  const { id } = useParams();
  const [isCompetitionFinished, setIsCompetitionFinished] = useState(false);

  const {
    data: participation,
    isError,
    isLoading,
  } = useQuery<Participation>({
    queryKey: ["apiParicipationCompetitionIdGet", id],
    queryFn: () =>
      api.apiParicipationCompetitionIdGet(Number(id)).then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner />;

  if (isError) {
    return <NotParticipantPage />;
  }

  if (isCompetitionFinished) {
    return <TimeUpPage />;
  }

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
          <ParticipationTimer
            startedAt={participation?.startedAt ?? ""}
            duration={participation?.competition?.duration ?? 0}
            setIsCompetitionFinished={setIsCompetitionFinished}
          />
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
              dataSource={participation?.competition?.competitionQuizzes ?? []}
              renderItem={({ quiz }) => (
                <Link
                  to={`/quiz/${quiz?.id}?competitionId=${id}&participationId=${participation?.id}`}
                >
                  <List.Item
                    style={{
                      backgroundColor: "#3A3A3A",
                      marginBottom: "8px",
                      borderRadius: "8px",
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <Text style={{ color: "#fff" }}>{quiz?.title}</Text>
                      }
                      description={
                        <Text style={{ color: "#8c8c8c" }}>
                          {quiz?.createdAt}
                        </Text>
                      }
                    />
                  </List.Item>
                </Link>
              )}
            />
          </StyledCard>

          <StyledCard>
            <Title level={4} style={{ color: "#fff", marginBottom: "16px" }}>
              Problems
            </Title>
            <List
              dataSource={participation?.competition?.competitionProblems ?? []}
              renderItem={({ problem }) => (
                <Link to={`/problem/${problem?.id}?competitionId=${id}`}>
                  <List.Item
                    style={{
                      backgroundColor: "#3A3A3A",
                      marginBottom: "8px",
                      borderRadius: "8px",
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <Text style={{ color: "#fff" }}>{problem?.title}</Text>
                      }
                      description={
                        <Text style={{ color: "#8c8c8c" }}>
                          {problem?.createdAt}
                        </Text>
                      }
                    />
                  </List.Item>
                </Link>
              )}
            />
          </StyledCard>
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
}

export default ViewCompetition;
