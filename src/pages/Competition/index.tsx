import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Pagination, Row } from "antd";

import { mockData } from "./consts";

import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";

export default function CompetitionPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const paginatedData = mockData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {paginatedData.map((competition) => (
          <Col xs={24} sm={12} lg={8} key={competition.id}>
            <Link to={competition.id}>
              <Card
                bordered={false}
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  color: "#000",
                }}
                cover={
                  <img
                    alt={competition.name}
                    src={competition.image}
                    style={{
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      height: 150,
                      objectFit: "cover",
                    }}
                  />
                }
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
                  <span>{competition.date}</span>
                </div>
                <h3 style={{ margin: "0 0 8px", color: "#000" }}>
                  {competition.name}
                </h3>
                <p style={{ margin: "0", color: "#555" }}>
                  {competition.location}
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
                  See more
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
          total={mockData.length}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
