import { FormattedMessage } from "react-intl";
import { Tag } from "antd";
import { RoleType } from "types/authTypes";

export const columns = [
  {
    title: <FormattedMessage id="common.username" />,
    dataIndex: "userName",
    key: "userName",
    align: "left" as const,
  },
  {
    title: <FormattedMessage id="common.email" />,
    dataIndex: "email",
    key: "email",
    align: "center" as const,
  },
  {
    title: <FormattedMessage id="user.page.const.image" />,
    dataIndex: "image",
    key: "image",
    render: (imageUrl: string) =>
      imageUrl ? <img src={imageUrl} style={{ maxWidth: "50px" }} /> : "",
    align: "center" as const,
  },
  {
    title: <FormattedMessage id="user.page.const.desc" />,
    dataIndex: "description",
    key: "description",
    align: "center" as const,
  },
  {
    title: <FormattedMessage id="user.page.const.role" />,
    dataIndex: "role",
    key: "role",
    render: (role: RoleType) => (
      <Tag color={role === "Teacher" ? "gold" : "blue"}>{role}</Tag>
    ),
    align: "center" as const,
  },
  {
    title: <FormattedMessage id="common.created.at" />,
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    align: "center" as const,
  },
  {
    title: <FormattedMessage id="user.page.const.updated.at" />,
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (updatedAt: string) =>
      updatedAt ? new Date(updatedAt).toLocaleDateString() : "-",
    align: "right" as const,
  },
];
