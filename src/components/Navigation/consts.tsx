import { FormattedMessage } from "react-intl";
import { MenuProps } from "antd";
import { Paths } from "routes/paths";

import {
  ExperimentOutlined,
  FireOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const items: MenuProps["items"] = [
  {
    label: <FormattedMessage id="menu.home" />,
    key: "home",
  },
  {
    label: <FormattedMessage id="menu.problems" />,
    key: "problems",
  },
  {
    label: <FormattedMessage id="menu.teachers" />,
    key: "teachers",
  },
  {
    label: <FormattedMessage id="menu.settings" />,
    key: "settings",
    icon: <SettingOutlined />,
  },
];
export const sideBarItems: MenuProps["items"] = [
  {
    label: <FormattedMessage id="menu.home" />,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <FormattedMessage id="menu.quizzes" />,
    key: "quizzes",
    icon: <ExperimentOutlined />,
  },
  {
    label: <FormattedMessage id="menu.problems" />,
    key: "problems",
    icon: <ExperimentOutlined />,
  },
  {
    label: <FormattedMessage id="menu.competition" />,
    key: "competition",
    icon: <FireOutlined />,
  },
  // {
  //   label: "Archived Groups",
  //   key: "archived-groups",
  // },
  {
    label: <FormattedMessage id="menu.createGroup" />,
    key: "group/create",
    icon: <PlusCircleOutlined />,
  },
  {
    label: <FormattedMessage id="menu.createProblem" />,
    key: "problem/create",
    icon: <PlusCircleOutlined />,
  },
  {
    label: <FormattedMessage id="menu.createQuiz" />,
    key: Paths.createQuiz,
    icon: <PlusCircleOutlined />,
  },
  {
    label: <FormattedMessage id="menu.users" />,
    key: "users",
    icon: <UserOutlined />,
  },
];
