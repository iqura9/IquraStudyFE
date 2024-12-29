import { Button, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

export const PageContainer = styled.div({});

export const Header = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  marginBottom: 24,
});

export const BannerImage = styled.img({
  width: 64,
  height: 64,
  borderRadius: 8,
});

export const HeaderTextContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});

export const VirtualText = styled(Text)({
  display: "block",
  color: "#8c8c8c",
});

export const StyledButton = styled(Button)({
  backgroundColor: "#1890ff",
  borderColor: "#1890ff",
  borderRadius: 8,
});
