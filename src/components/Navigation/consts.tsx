import { MenuProps } from "antd";

import { SettingOutlined, UserOutlined } from "@ant-design/icons";

export const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "home",
  },
  {
    label: "Problems",
    key: "problems",
  },
  {
    label: "Teachers",
    key: "teachers",
  },
  {
    label: "Settings",
    key: "settings",
    icon: <SettingOutlined />,
  },
];
export const sideBarItems: MenuProps["items"] = [
  {
    label: "Home",
    key: "home",
  },
  {
    label: "Groups",
    key: "groups",
  },

  {
    label: "Archived Groups",
    key: "archived-groups",
  },
  {
    label: "Create Group",
    key: "group/create",
  },
  {
    label: "Create Problem",
    key: "problem/create",
  },
  {
    label: "Users",
    key: "users",
    icon: <UserOutlined />,
  },
];
