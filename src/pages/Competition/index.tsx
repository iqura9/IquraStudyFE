import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Pagination, Row } from "antd";
import { api } from "api/index";
import LinkButton from "components/LinkButton";
import { Competition } from "generated-api/api";
import { useRole } from "hooks/useRole";
import { Paths } from "routes/paths";
import styled from "styled-components";

import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";

const ButtonWrapper = styled("div")({
  display: "flex",
  marginBottom: 12,
  justifyContent: "flex-end",
});

type CompetitionPageProps = {
  data: Competition[] | undefined;
};

export function CompetitionPageWithData() {
  const { data: teacherCompetitions } = useQuery({
    queryKey: ["getTeacherCompetitions"],
    queryFn: () => api.apiCompetitionTeacherGet().then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
  });
  const { isTeacher } = useRole();

  return (
    <div>
      {isTeacher ? (
        <ButtonWrapper>
          <LinkButton
            to={Paths.createCompetition}
            formattedMessageId="menu.createCompetition"
          />
        </ButtonWrapper>
      ) : null}
      <CompetitionPage data={teacherCompetitions} />
    </div>
  );
}

export default function CompetitionPage({ data }: CompetitionPageProps) {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const paginatedData = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {paginatedData?.map((competition) => (
          <Col xs={24} sm={12} lg={8} key={competition.id}>
            <Link to={`/competition/${String(competition.id)}?groupId=${id}`}>
              <Card
                bordered={false}
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  color: "#000",
                }}
              >
                <div
                  style={{
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#4cafb5",
                  }}
                >
                  <CalendarOutlined />
                  <span>
                    {new Date(competition.startTime).toLocaleDateString()} -{" "}
                    {new Date(competition.endTime).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ margin: "0 0 8px", color: "#000" }}>
                  {competition.title || "Unnamed Competition"}
                </h3>
                <p style={{ margin: "0", color: "#555" }}>
                  {competition.description || "No description available."}
                </p>
                <Button
                  type="default"
                  icon={<PlusOutlined />}
                  style={{
                    marginTop: "16px",
                    color: "#4cafb5",
                    borderColor: "#4cafb5",
                    background: "transparent",
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                >
                  <FormattedMessage id="common.seeMore" />
                </Button>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data?.length || 0}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
