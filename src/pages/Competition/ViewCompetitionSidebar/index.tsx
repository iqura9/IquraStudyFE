import { ReactNode, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout, Menu, Progress, Typography } from "antd";
import { api } from "api/index";
import { Participation } from "generated-api/api";
import styled from "styled-components";

import { ParticipationTimer } from "../View/ParticipationTimer";
import { TimeUpPage } from "../View/TimeUpPage";

import {
  InfoCircleOutlined,
  NumberOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";

const { Sider } = Layout;
const { Title, Text } = Typography;

const colors = {
  background: "#f8f9fa",
  sidebar: "#ffffff",
  card: "#ffffff",
  border: "#ddd",
  text: "#333",
  textSecondary: "#888",
  highlight: "#4cafb5",
  hover: "#f0f2f5",
};

const StyledLayout = styled(Layout)({
  minHeight: "100vh",
  backgroundColor: colors.background,
});

const StyledSider = styled(Sider)<{ collapsed?: boolean }>(() => ({
  background: `${colors.sidebar} !important`,
  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const SidebarInner = styled("div")({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const SidebarHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "16px",
  color: colors.text,
});

const StyledProgress = styled(Progress)({
  marginTop: "8px",
  width: "100%",
  ".ant-progress-bg": {
    backgroundColor: colors.highlight,
  },
});

const MenuWrapper = styled("div")({
  marginTop: "24px",
});

const FooterWrapper = styled("div")({
  marginTop: "auto",
  paddingTop: "16px",
  borderTop: `1px solid ${colors.border}`,
  textAlign: "center",
  color: colors.textSecondary,
});

const StyledMenu = styled(Menu)({
  backgroundColor: "transparent",
  border: "none",
  "& .ant-menu-item": {
    borderRadius: "8px",
    marginBottom: "8px",
  },
  "& .ant-menu-item-selected": {
    backgroundColor: colors.hover,
    color: colors.highlight,
  },
  "& .ant-menu-item:hover": {
    backgroundColor: colors.hover,
    color: colors.highlight,
  },
  "& .ant-menu-title-content": {
    color: colors.text,
  },
});

interface ViewCompetitionSidebarProps {
  children: ReactNode;
  isCompetiton?: boolean;
}

export default function ViewCompetitionSidebar({
  children,
  isCompetiton = false,
}: ViewCompetitionSidebarProps) {
  // competitionId

  const { id } = useParams();
  const [isCompetitionFinished, setIsCompetitionFinished] = useState(false);
  const [searchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(false);

  const competitionId = searchParams.get("competitionId");
  const rightCompetitionId = competitionId ? Number(competitionId) : Number(id);
  const { data: participation } = useQuery<Participation>({
    queryKey: ["apiParicipationCompetitionIdGet", rightCompetitionId],
    queryFn: () =>
      api
        .apiParicipationCompetitionIdGet(rightCompetitionId)
        .then((res) => res.data),
  });

  const progressPercent = 0;
  const maxScore = 100;
  const userScore = 0;
  const timeProgressPercent = 50;

  if (isCompetitionFinished) {
    return <TimeUpPage />;
  }

  if (!isCompetiton) return <>{children}</>;

  return (
    <StyledLayout>
      <StyledSider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth={80}
      >
        <SidebarInner>
          {!collapsed && (
            <SidebarHeader>
              <TrophyOutlined
                style={{ fontSize: "48px", color: colors.highlight }}
              />
              <Title
                level={4}
                style={{ color: colors.text, margin: "16px 0 8px" }}
              >
                Test Name
              </Title>
              <Text style={{ color: colors.textSecondary }}>Бали</Text>
              <StyledProgress percent={progressPercent} showInfo={false} />
              <Text style={{ color: colors.text, marginTop: "8px" }}>
                {userScore} / {maxScore}
              </Text>
              <Text style={{ color: colors.textSecondary, marginTop: "16px" }}>
                Залишок часу
              </Text>
              <StyledProgress percent={timeProgressPercent} showInfo={false} />
              <ParticipationTimer
                startedAt={participation?.startedAt ?? ""}
                duration={participation?.competition?.duration ?? 0}
                setIsCompetitionFinished={setIsCompetitionFinished}
              />
            </SidebarHeader>
          )}

          <MenuWrapper>
            <StyledMenu mode="inline">
              {participation?.competition?.competitionQuizzes?.map((el) => {
                return (
                  <Link
                    key={el.quiz?.title}
                    to={`/quiz/${el.quiz?.id}?competitionId=${rightCompetitionId}&participationId=${participation?.id}`}
                  >
                    <Menu.Item key={el.quiz?.title} icon={<NumberOutlined />}>
                      {collapsed ? null : el.quiz?.title}
                    </Menu.Item>
                  </Link>
                );
              })}
              {participation?.competition?.competitionProblems?.map((el) => {
                return (
                  <Link
                    key={el.problem?.title}
                    to={`/problem/${el.problem?.id}?competitionId=${rightCompetitionId}`}
                  >
                    <Menu.Item
                      key={el.problem?.title}
                      icon={<NumberOutlined />}
                    >
                      {collapsed ? null : el.problem?.title}
                    </Menu.Item>
                  </Link>
                );
              })}
            </StyledMenu>
          </MenuWrapper>

          {!collapsed && (
            <FooterWrapper>
              <InfoCircleOutlined
                style={{ fontSize: "18px", marginBottom: "8px" }}
              />
              <Text style={{ display: "block", fontSize: "12px" }}>
                Про сайт Повідом.
              </Text>
            </FooterWrapper>
          )}
        </SidebarInner>
      </StyledSider>

      <Layout>{children}</Layout>
    </StyledLayout>
  );
}
