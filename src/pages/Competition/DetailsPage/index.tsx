import { Button, Card, Col, Row, Space, Tag, Timeline, Typography } from "antd";

import {
  BannerImage,
  Header,
  HeaderTextContainer,
  PageContainer,
  StyledButton,
  VirtualText,
} from "./styled";

import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const competitionData = {
  title: "Two Pointers Technique",
  description:
    "This is a training contest to introduce students to the technique of two pointers, understanding its fundamentals, and mastering its implementation in programming.",
  date: "November 2, 2024, 3:00 PM",
  duration: "3 hours",
  problems: 14,
  difficulty: "Easy",
  format: "IOI, 14 problems, 3 hours",
  ended: "Ended 2 months ago",
  virtual: "Virtual",
  banner: "https://via.placeholder.com/64x64?text=Banner",
};

function CompetitionDetailPage() {
  return (
    <PageContainer>
      <Header>
        <Space>
          <BannerImage src={competitionData.banner} alt="competition banner" />
          <HeaderTextContainer>
            <Title level={3} style={{ margin: 0 }}>
              {competitionData.title}
            </Title>
            <Space>
              <CalendarOutlined style={{ color: "#1890ff" }} />
              <Text>{competitionData.date}</Text>
            </Space>
            <VirtualText>{competitionData.virtual}</VirtualText>
          </HeaderTextContainer>
        </Space>
        <Space>
          <Button icon={<ShareAltOutlined />}>Share</Button>
          <StyledButton type="primary" icon={<PlusOutlined />}>
            Join
          </StyledButton>
        </Space>
      </Header>

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
    </PageContainer>
  );
}

export default CompetitionDetailPage;
