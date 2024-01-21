import { Tag } from "antd";
import { RoleType } from "types/authTypes";

export const columns = [
  {
    title: "Username",
    dataIndex: "userName",
    key: "userName",
    align: "left" as const,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center" as const,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (imageUrl: string) =>
      imageUrl ? <img src={imageUrl} style={{ maxWidth: "50px" }} /> : "",
    align: "center" as const,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    align: "center" as const,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: RoleType) => (
      <Tag color={role === "Teacher" ? "gold" : "blue"}>{role}</Tag>
    ),
    align: "center" as const,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    align: "center" as const,
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (updatedAt: string) =>
      updatedAt ? new Date(updatedAt).toLocaleDateString() : "-",
    align: "right" as const,
  },
];
