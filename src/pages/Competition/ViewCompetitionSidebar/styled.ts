import { Layout, Menu, Progress } from "antd";
import styled from "styled-components";

const { Sider } = Layout;

export const colors = {
  background: "#f8f9fa",      // light gray
  sidebar: "#ffffff",         // pure white
  card: "#ffffff",            // pure white
  border: "#ddd",             // light gray border
  text: "#333333",            // dark text
  textSecondary: "#888888",   // muted gray
  highlight: "#4cafb5",       // accent color
  hover: "#f0f2f5",           // subtle hover
};

export const StyledLayout = styled(Layout)({
  minHeight: "100vh",
  backgroundColor: colors.background,
});

export const StyledSider = styled(Sider)({
  background: `${colors.sidebar} !important`,
  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const SidebarInner = styled("div")({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const SidebarHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "16px",
  color: colors.text,
});

export const StyledProgress = styled(Progress)({
  marginTop: "8px",
  width: "100%",
  ".ant-progress-inner": {

  },
  ".ant-progress-bg": {
    backgroundColor: colors.highlight,
  },
});

export const MenuWrapper = styled("div")({
  marginTop: "24px",
});

export const StyledMenu = styled(Menu)({
  backgroundColor: "transparent",
  border: "none",
  color: colors.text,

  "& .ant-menu-item": {
    borderRadius: "8px",
    marginBottom: "8px",
  },
  "& .ant-menu-item-selected": {
    backgroundColor: colors.hover,
    color: colors.highlight,
  },
  "& .ant-menu-item:hover": {
    backgroundColor: colors.hover,
    color: colors.highlight,
  },
  "& .ant-menu-title-content": {
    color: colors.text,
  },
});
