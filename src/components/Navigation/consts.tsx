import { MenuProps } from "antd";
import { Paths } from "routes/paths";

import {
  BranchesOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
    icon: <HomeOutlined />,
  },
  {
    label: "Groups",
    key: "groups",
    icon: <BranchesOutlined />,
  },
  // {
  //   label: "Archived Groups",
  //   key: "archived-groups",
  // },
  {
    label: "Create Group",
    key: "group/create",
    icon: <PlusCircleOutlined />,
  },
  {
    label: "Create Problem",
    key: "problem/create",
    icon: <PlusCircleOutlined />,
  },
  {
    label: "Create Quiz",
    key: Paths.createQuiz,
    icon: <PlusCircleOutlined />,
  },
  {
    label: "Users",
    key: "users",
    icon: <UserOutlined />,
  },
];
