import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { Card, Layout, List, Typography } from "antd";
import { api } from "api/index";
import Spinner from "components/Spinner";
import { Participation } from "generated-api/api";
import styled from "styled-components";

import ViewCompetitionSidebar from "../ViewCompetitionSidebar";

import NotParticipantPage from "./NotParticipantPage";

import { useQuery } from "@tanstack/react-query";

const { Sider, Content } = Layout;
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

const StyledContent = styled(Content)({
  padding: "24px",
  backgroundColor: colors.background,
});

const StyledCard = styled(Card)({
  backgroundColor: colors.card,
  color: colors.text,
  marginBottom: "16px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  ".ant-card-body": {
    padding: "16px",
  },
});

const StyledListItem = {
  backgroundColor: colors.hover,
  marginBottom: "8px",
  borderRadius: "8px",
  padding: "8px",
};

function ViewCompetition() {
  const { id } = useParams();

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

  return (
    <ViewCompetitionSidebar isCompetiton>
      <StyledContent>
        <StyledCard>
          <Title level={4} style={{ color: colors.text, marginBottom: "16px" }}>
            <FormattedMessage id="competition.quizzes" />
          </Title>
          <List
            dataSource={participation?.competition?.competitionQuizzes ?? []}
            renderItem={({ quiz }) => (
              <Link
                to={`/quiz/${quiz?.id}?competitionId=${id}&participationId=${participation?.id}`}
              >
                <List.Item style={StyledListItem}>
                  <List.Item.Meta
                    title={
                      <Text style={{ color: colors.text }}>{quiz?.title}</Text>
                    }
                    description={
                      <Text style={{ color: colors.textSecondary }}>
                        {new Date(quiz?.createdAt ?? 0).toLocaleDateString()}
                      </Text>
                    }
                  />
                </List.Item>
              </Link>
            )}
          />
        </StyledCard>

        <StyledCard>
          <Title level={4} style={{ color: colors.text, marginBottom: "16px" }}>
            <FormattedMessage id="competition.problems" />
          </Title>
          <List
            dataSource={participation?.competition?.competitionProblems ?? []}
            renderItem={({ problem }) => (
              <Link to={`/problem/${problem?.id}?competitionId=${id}`}>
                <List.Item style={StyledListItem}>
                  <List.Item.Meta
                    title={
                      <Text style={{ color: colors.text }}>
                        {problem?.title}
                      </Text>
                    }
                    description={
                      <Text style={{ color: colors.textSecondary }}>
                        {new Date(problem?.createdAt ?? 0).toLocaleDateString()}
                      </Text>
                    }
                  />
                </List.Item>
              </Link>
            )}
          />
        </StyledCard>
      </StyledContent>
    </ViewCompetitionSidebar>
  );
}

export default ViewCompetition;
