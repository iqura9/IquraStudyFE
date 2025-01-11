import React from "react";
import { Button, Card, Col, Row, Tag, Timeline, Typography } from "antd";
import { Competition } from "generated-api/api";

import { ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface OverviewTabProps {
  competitionData?: Competition;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ competitionData }) => {
  if (!competitionData) {
    return <p>No competition data available.</p>;
  }

  return (
    <Row gutter={[16, 16]}>
      {/* Overview Section */}
      <Col xs={24} md={16}>
        <Card
          bordered={false}
          cover={
            <img
              alt={competitionData.title}
              src="https://via.placeholder.com/800x400?text=Two+Pointers+Technique"
              style={{
                height: "200px",
                objectFit: "cover",
              }}
            />
          }
        >
          <Title level={2}>
            {competitionData.title || "Untitled Competition"}
          </Title>
          <Tag color="blue">{competitionData.format || "Unknown Format"}</Tag>
          <Text style={{ display: "block", marginTop: "16px" }}>
            {competitionData.description || "No description available."}
          </Text>
        </Card>
      </Col>

      {/* Details Section */}
      <Col xs={24} md={8}>
        <Card>
          <Title level={4}>Competition Details</Title>
          <Timeline>
            <Timeline.Item>
              <Text strong>Start Date:</Text>{" "}
              {new Date(competitionData.startTime).toLocaleString()}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>End Date:</Text>{" "}
              {new Date(competitionData.endTime).toLocaleString()}
            </Timeline.Item>
            {competitionData.participantMode === "Virtual" &&
              competitionData.duration && (
                <Timeline.Item>
                  <Text strong>Duration:</Text> {competitionData.duration} hours
                </Timeline.Item>
              )}
            <Timeline.Item>
              <Text strong>Difficulty:</Text>{" "}
              {competitionData.difficulty || "Not specified"}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>Format:</Text>{" "}
              {competitionData.format || "Not specified"}
            </Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined />}>
              <Text type="secondary">
                Participant Mode: {competitionData.participantMode || "Unknown"}
              </Text>
            </Timeline.Item>
          </Timeline>
          <Button type="primary" block style={{ marginTop: "16px" }}>
            Join Contest
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default OverviewTab;
