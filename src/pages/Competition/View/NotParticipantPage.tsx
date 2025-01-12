import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space, Typography } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

// Styled Container
const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#1E1E1E",
  color: "#fff",
  padding: "24px",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  marginTop: "24px",
  backgroundColor: "#4cafb5",
  borderColor: "#4cafb5",
  color: "#fff",
  borderRadius: "8px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#3A9C91",
    borderColor: "#3A9C91",
  },
});

function NotParticipantPage() {
  const navigate = useNavigate();

  const handleGoToMainPage = () => {
    navigate("/"); // Navigate to the main page
  };

  return (
    <StyledContainer>
      <Space direction="vertical" size="large">
        <Title level={3} style={{ color: "#fff" }}>
          Sorry, you are not a participant in this competition.
        </Title>
        <Text style={{ color: "#8c8c8c" }}>
          Please go to the main page to explore other competitions.
        </Text>
        <StyledButton type="primary" onClick={handleGoToMainPage}>
          Go to Main Page
        </StyledButton>
      </Space>
    </StyledContainer>
  );
}

export default NotParticipantPage;
