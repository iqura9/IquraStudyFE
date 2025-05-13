import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Space, Typography } from "antd";
import styled from "styled-components";

import NotParticipantPage from "./NotParticipantPage";

const { Title, Text } = Typography;

// Styled Container
const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f7fa", 
  color: "#2e2e2e", 
  padding: "24px",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "24px",
  backgroundColor: "#00b894", 
  borderColor: "#00b894",
  color: "#ffffff",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: "16px",
  padding: "12px 24px",

  "&:hover": {
    backgroundColor: "#019874",
    borderColor: "#019874",
  },
});



export function TimeUpPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoToMainPage = () => {
    navigate(`/competition/${id}`);
  };

  return (
    <StyledContainer>
      <Space direction="vertical" size="large" align="center">
        <Title level={3} style={{ color: "#8c8c8c" }}>
          {/* Sorry, times up */}
          Вибачте, час закінчився
        </Title>
        <Text style={{ color: "#8c8c8c" }}>
        Будь ласка, перейдіть на сторінку змагання, щоб побачити результат
        </Text>
        <StyledButton type="primary" onClick={handleGoToMainPage}>
          Перейти на сторінку змагання
        </StyledButton>
      </Space>
    </StyledContainer>
  );
}

export default NotParticipantPage;
