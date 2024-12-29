import React from "react";
import { Button, Card, Col, Row, Tag, Timeline, Typography } from "antd";

import { ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface OverviewTabProps {
  competitionData: {
    title: string;
    description: string;
    date: string;
    duration: string;
    problems: number;
    difficulty: string;
    format: string;
    ended: string;
  };
}

const OverviewTab: React.FC<OverviewTabProps> = ({ competitionData }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
        <Card
          bordered={false}
          cover={
            <img
              alt="competition banner"
              src="https://via.placeholder.com/800x400?text=Two+Pointers+Technique"
            />
          }
        >
          <Title level={2}>{competitionData.title}</Title>
          <Tag color="blue">Training Contest</Tag>
          <Text>{competitionData.description}</Text>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card>
          <Title level={4}>Competition Details</Title>
          <Timeline>
            <Timeline.Item>
              <Text strong>Date:</Text> {competitionData.date}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>Duration:</Text> {competitionData.duration}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>Problems:</Text> {competitionData.problems}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>Difficulty:</Text> {competitionData.difficulty}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>Format:</Text> {competitionData.format}
            </Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined />}>
              <Text type="secondary">{competitionData.ended}</Text>
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
