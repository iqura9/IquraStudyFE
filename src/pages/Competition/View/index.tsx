import { FormattedMessage, useIntl } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { Card, Layout, List, Progress, Typography } from "antd";
import { api } from "api/index";
import Spinner from "components/Spinner";
import { Participation } from "generated-api/api";
import styled from "styled-components";

import ViewCompetitionSidebar from "../ViewCompetitionSidebar";

import NotParticipantPage from "./NotParticipantPage";

import { useQuery } from "@tanstack/react-query";

const { Content } = Layout;
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
  padding: "16px",
};

function ViewCompetition() {
  const { id } = useParams();
  const { formatMessage } = useIntl();
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
            renderItem={(data) => {
              const { quiz } = data;
              const isSubmitted = data.submittedAt !== "0001-01-01T00:00:00";
              const score = data?.maxScore ?? 0;

              return (
                <Link
                  to={`/quiz/${quiz?.id}?competitionId=${id}&participationId=${participation?.id}`}
                >
                  <List.Item style={StyledListItem}>
                    <List.Item.Meta
                      title={
                        <Text style={{ color: colors.text }}>
                          {quiz?.title}{" "}
                          {isSubmitted ? (
                            <Text style={{ color: "green", marginLeft: "8px" }}>
                              ✓ {formatMessage({ id: "common.submittion" })}
                            </Text>
                          ) : null}
                        </Text>
                      }
                      description={
                        <>
                          <Text style={{ color: colors.textSecondary }}>
                            {new Date(
                              quiz?.createdAt ?? 0,
                            ).toLocaleDateString()}
                          </Text>
                          <Progress
                            percent={score}
                            showInfo={false}
                            strokeColor="#1890ff"
                          />
                        </>
                      }
                    />
                  </List.Item>
                </Link>
              );
            }}
          />
        </StyledCard>

        <StyledCard>
          <Title level={4} style={{ color: colors.text, marginBottom: "16px" }}>
            <FormattedMessage id="competition.problems" />
          </Title>
          <List
            dataSource={participation?.competition?.competitionProblems ?? []}
            renderItem={(data) => {
              const { problem } = data;
              const isSubmitted = data.submittedAt !== "0001-01-01T00:00:00";
              const score = data.maxScore ?? 0;
              return (
                <Link
                  to={`/problem/${problem?.id}?competitionId=${id}&participationId=${participation?.id}`}
                >
                  <List.Item style={StyledListItem}>
                    <List.Item.Meta
                      title={
                        <Text style={{ color: colors.text }}>
                          {problem?.title}
                          {isSubmitted ? (
                            <Text style={{ color: "green", marginLeft: "8px" }}>
                              ✓ {formatMessage({ id: "common.submittion" })}
                            </Text>
                          ) : null}
                        </Text>
                      }
                      description={
                        <>
                          <Text style={{ color: colors.textSecondary }}>
                            {new Date(
                              problem?.createdAt ?? 0,
                            ).toLocaleDateString()}
                          </Text>
                          <Progress
                            percent={score}
                            showInfo={false}
                            strokeColor="#1890ff"
                          />
                        </>
                      }
                    />
                  </List.Item>
                </Link>
              );
            }}
          />
        </StyledCard>
      </StyledContent>
    </ViewCompetitionSidebar>
  );
}

export default ViewCompetition;
