import { SettingOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

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
