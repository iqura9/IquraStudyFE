import { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Menu, Progress, Typography } from "antd";
import { api } from "api/index";
import { Participation } from "generated-api/api";
import styled from "styled-components";

import { ParticipationTimer } from "../View/ParticipationTimer";
import { TimeUpPage } from "../View/TimeUpPAge";

import {
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
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

const StyledSider = styled(Sider)({
  background: `${colors.sidebar} !important`,
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.05)",
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
  const { id } = useParams();
  const [isCompetitionFinished, setIsCompetitionFinished] = useState(false);

  const { data: participation } = useQuery<Participation>({
    queryKey: ["apiParicipationCompetitionIdGet", id],
    queryFn: () =>
      api.apiParicipationCompetitionIdGet(Number(id)).then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
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
      <StyledSider width={250}>
        <SidebarHeader>
          <TrophyOutlined
            style={{ fontSize: "48px", color: colors.highlight }}
          />
          <Title level={4} style={{ color: colors.text, margin: "16px 0 8px" }}>
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

        <MenuWrapper>
          <StyledMenu mode="inline" defaultSelectedKeys={["1"]}>
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

      <Layout>{children}</Layout>
    </StyledLayout>
  );
}
