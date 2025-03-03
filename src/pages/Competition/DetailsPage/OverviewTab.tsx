import { FormattedMessage, useIntl } from "react-intl";
import { Button, Card, Col, Row, Tag, Timeline, Typography } from "antd";
import { CompetitionDto } from "generated-api/api";

import { useJoinCompetition } from "./useJoinCompetition";

import { ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface OverviewTabProps {
  competitionData?: CompetitionDto;
}

function handleCompetitionFormat(
  format: string = "",
  problemsCount: number,
  quizzesCount: number,
) {
  if (!format) return "Not specified";

  return `${format}, ${problemsCount} problems, ${quizzesCount} quizzes`;
}

function OverviewTab({ competitionData }: OverviewTabProps) {
  const { mutate: joinCompetiton } = useJoinCompetition();
  const { formatMessage } = useIntl();

  if (!competitionData) {
    return (
      <p>
        <FormattedMessage id="competition.noData" />
      </p>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
        <Card
          bordered={false}
          cover={
            <img
              alt={competitionData?.title ?? ""}
              src="../../../../public/trophy.webp"
              style={{
                height: "500px",
                objectFit: "cover",
              }}
            />
          }
        >
          <Title level={2}>
            {competitionData.title ||
              formatMessage({ id: "competition.untitled" })}
          </Title>
          <Tag color="blue">
            {competitionData.format ||
              formatMessage({ id: "competition.unknownFormat" })}
          </Tag>
          <Text style={{ display: "block", marginTop: "16px" }}>
            {competitionData.description ||
              formatMessage({ id: "competition.noDescription" })}
          </Text>
        </Card>
      </Col>

      {/* Details Section */}
      <Col xs={24} md={8}>
        <Card>
          <Title level={4}>
            <FormattedMessage id="competition.details" />
          </Title>
          <Timeline>
            <Timeline.Item>
              <Text strong>
                <FormattedMessage id="competition.startDate" />:
              </Text>{" "}
              {new Date(competitionData?.startTime).toLocaleString()}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>
                <FormattedMessage id="competition.endDate" />:
              </Text>{" "}
              {new Date(competitionData?.endTime).toLocaleString()}
            </Timeline.Item>
            {competitionData.participantMode === "Virtual" &&
              competitionData.duration && (
                <Timeline.Item>
                  <Text strong>
                    <FormattedMessage id="competition.duration" />:
                  </Text>{" "}
                  {competitionData.duration}{" "}
                  <FormattedMessage id="competition.hours" />
                </Timeline.Item>
              )}
            <Timeline.Item>
              <Text strong>
                <FormattedMessage id="competition.difficulty" />:
              </Text>{" "}
              {competitionData.difficulty ||
                formatMessage({ id: "competition.notSpecified" })}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>
                <FormattedMessage id="competition.format" />:
              </Text>{" "}
              {handleCompetitionFormat(
                competitionData?.format,
                competitionData.problemsCount,
                competitionData.quizzesCount,
              )}
            </Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined />}>
              <Text type="secondary">
                <FormattedMessage id="competition.participantMode" />:{" "}
                {competitionData.participantMode ||
                  formatMessage({ id: "competition.unknown" })}
              </Text>
            </Timeline.Item>
          </Timeline>
          <Button
            type="primary"
            style={{ marginTop: "16px" }}
            block
            onClick={() => joinCompetiton()}
          >
            <FormattedMessage id="competition.joinButton" />
          </Button>
        </Card>
      </Col>
    </Row>
  );
}

export default OverviewTab;
