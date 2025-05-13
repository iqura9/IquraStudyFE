import { ReactNode, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { api } from "api/index";
import { Participation } from "generated-api/api";

import { ParticipationTimer } from "../View/ParticipationTimer";
import { TimeUpPage } from "../View/TimeUpPage";

import {
  colors,
  MenuWrapper,
  SidebarHeader,
  SidebarInner,
  StyledLayout,
  StyledMenu,
  StyledProgress,
  StyledSider,
} from "./styled";
import { useGetPerticipation } from "./useGetPerticipation";

import {
  HomeOutlined,
  NumberOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface ViewCompetitionSidebarProps {
  children: ReactNode;
  isCompetiton?: boolean;
}

export default function ViewCompetitionSidebar({
  children,
  isCompetiton = false,
}: ViewCompetitionSidebarProps) {
  const [isCompetitionFinished, setIsCompetitionFinished] = useState(false);
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const competitionId = searchParams.get("competitionId");
  const rightCompetitionId = competitionId ? Number(competitionId) : Number(id);
  const { data: participation } = useGetPerticipation();

  const maxScore = useMemo(
    () =>
      ((participation?.competition?.competitionQuizzes?.length ?? 0) +
        (participation?.competition?.competitionProblems?.length ?? 0)) *
      100,
    [
      participation?.competition?.competitionQuizzes,
      participation?.competition?.competitionProblems,
    ],
  );
  const quizScores =
    useMemo(
      () =>
        participation?.competition?.competitionQuizzes?.reduce(
          (prev, curr) => (curr.maxScore ?? 0) + prev,
          0,
        ),
      [participation?.competition?.competitionQuizzes],
    ) ?? 0;

  const problemsScore =
    useMemo(
      () =>
        participation?.competition?.competitionProblems?.reduce(
          (prev, curr) => (curr.maxScore ?? 0) + prev,
          0,
        ),
      [participation?.competition?.competitionProblems],
    ) ?? 0;

  const userScore = quizScores + problemsScore;
  const progressPercent = Math.floor((userScore * 100) / maxScore);

  if (isCompetitionFinished) {
    return <TimeUpPage />;
  }

  if (!isCompetiton) return <>{children}</>;

  const isDark = false;

  return (
    <StyledLayout>
      <StyledSider
        isDark={isDark}
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
                style={{
                  fontSize: "48px",
                  color: isDark ? colors.sidebar : colors.highlight,
                }}
              />
              <Title
                level={4}
                style={{
                  color: isDark ? colors.sidebar : colors.text,
                  margin: "16px 0 8px",
                }}
              >
                {participation?.competition?.title}
              </Title>
              <Text
                style={{
                  color: isDark ? colors.sidebar : colors.textSecondary,
                }}
              >
                <FormattedMessage id="common.score" />
              </Text>
              <StyledProgress
                percent={progressPercent}
                showInfo={false}
                isDark={isDark}
              />
              <Text
                style={{
                  color: isDark ? colors.sidebar : colors.text,
                  marginTop: "8px",
                }}
              >
                {userScore} / {maxScore}
              </Text>
              <Text
                style={{
                  color: isDark ? colors.sidebar : colors.textSecondary,
                  marginTop: "16px",
                }}
              >
                <FormattedMessage id="competition.remaining.time" />
              </Text>

              <ParticipationTimer
                startedAt={participation?.startedAt ?? ""}
                duration={participation?.competition?.duration ?? 0}
                setIsCompetitionFinished={setIsCompetitionFinished}
                isDark={isDark}
              />
            </SidebarHeader>
          )}

          <MenuWrapper>
            <StyledMenu
              mode="inline"
              defaultOpenKeys={["home"]}
              isDark={isDark}
            >
              <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to={`/competition/view/${rightCompetitionId}`}>
                  {collapsed ? null : <FormattedMessage id="menu.home" />}
                </Link>
              </Menu.Item>
              {participation?.competition?.competitionQuizzes?.map((el) => {
                return (
                  <Menu.Item key={el.quiz?.title} icon={<NumberOutlined />}>
                    <Link
                      to={`/quiz/${el.quiz?.id}?competitionId=${rightCompetitionId}&participationId=${participation?.id}`}
                    >
                      {collapsed ? null : el.quiz?.title}
                    </Link>
                  </Menu.Item>
                );
              })}
              {participation?.competition?.competitionProblems?.map((el) => {
                return (
                  <Menu.Item key={el.problem?.title} icon={<NumberOutlined />}>
                    <Link
                      to={`/problem/${el.problem?.id}?competitionId=${rightCompetitionId}&participationId=${participation?.id}`}
                    >
                      {collapsed ? null : el.problem?.title}
                    </Link>
                  </Menu.Item>
                );
              })}
            </StyledMenu>
          </MenuWrapper>
        </SidebarInner>
      </StyledSider>
      <Layout>{children}</Layout>
    </StyledLayout>
  );
}
