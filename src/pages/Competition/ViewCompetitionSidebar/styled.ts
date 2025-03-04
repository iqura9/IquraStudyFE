import { Layout, Menu, Progress } from "antd";
import styled from "styled-components";

const { Sider } = Layout;

export const colors = {
  background: "#f8f9fa",
  sidebar: "#ffffff",
  card: "#ffffff",
  border: "#ddd",
  text: "#333",
  textSecondary: "#888",
  highlight: "#4cafb5",
  hover: "#f0f2f5",
};

export const StyledLayout = styled(Layout)({
  minHeight: "100vh",
  backgroundColor: colors.background,
});

export const StyledSider = styled(Sider)<{
  collapsed?: boolean;
  isDark?: boolean;
}>(({ isDark = false }) => ({
  background: `${isDark ? "#0F1724" : colors.sidebar} !important`,
  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.05)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

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

export const StyledProgress = styled(Progress)<{ isDark?: boolean }>(
  ({ isDark = false }) => ({
    marginTop: "8px",
    width: "100%",
    ...(isDark && {
      ".ant-progress-inner": {
        background: "#fff",
      },
    }),

    ".ant-progress-bg": {
      backgroundColor: colors.highlight,
    },
  }),
);

export const MenuWrapper = styled("div")({
  marginTop: "24px",
});

export const StyledMenu = styled(Menu)<{ isDark?: boolean }>(
  ({ isDark = false }) => ({
    backgroundColor: "transparent",
    border: "none",
    color: isDark ? "#fff" : "#000",
    "& .ant-menu-item": {
      borderRadius: "8px",
      marginBottom: "8px",
    },
    "& .ant-menu-item-selected": {
      backgroundColor: colors.hover,
      color: isDark ? colors.sidebar : colors.highlight,
    },
    "& .ant-menu-item:hover": {
      backgroundColor: colors.hover,
      color: isDark ? colors.sidebar : colors.highlight,
    },
    "& .ant-menu-title-content": {
      color: isDark ? colors.sidebar : colors.text,
    },
  }),
);
