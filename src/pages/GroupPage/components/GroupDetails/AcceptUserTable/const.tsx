import { Button, notification, Space, Tag } from "antd";
import { putGroupPerson } from "api/group.api";
import IsShow from "settings/IsShow";
import { RoleType } from "types/authTypes";
import { UserStatus } from "types/generaTypes";
import { IGroupPeople } from "types/groupTypes";

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
    title: "User Status",
    dataIndex: "userStatus",
    key: "userStatus",
    render: (role: UserStatus) => (
      <Tag
        color={
          role === UserStatus.Success
            ? "green"
            : role === UserStatus.Pending
            ? "gold"
            : "error"
        }
      >
        {role}
      </Tag>
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
    align: "center" as const,
  },
  {
    title: "Accept",
    dataIndex: "accept",
    key: "accept",
    render: (_: any, _record: any) => (
      <IsShow rule={_record.userStatus === UserStatus.Pending}>
        <Space>
          <Button
            onClick={() =>
              handleChangeUserStatus(
                _record.queryId,
                {
                  groupId: _record.groupId,
                  userId: _record.userId,
                  userStatus: UserStatus.Success,
                },
                _record.refetch
              )
            }
          >
            Accept
          </Button>
          <Button
            danger
            onClick={() =>
              handleChangeUserStatus(
                _record.queryId,
                {
                  groupId: _record.groupId,
                  userId: _record.userId,
                  userStatus: UserStatus.Declined,
                },
                _record.refetch
              )
            }
          >
            Decline
          </Button>
        </Space>
      </IsShow>
    ),
    align: "center" as const,
  },
];

export const handleDataToTable = (
  data: IGroupPeople[] | undefined,
  refetch: () => void
) => {
  return data?.map((d) => {
    return {
      ...d.user,
      queryId: d.id,
      userStatus: d.userStatus,
      groupId: d.groupId,
      userId: d.userId,
      refetch: refetch,
    };
  });
};

export interface IPutGroupPersonDto {
  groupId: number;
  userId: string;
  userStatus: UserStatus;
}

const handleChangeUserStatus = async (
  id: string,
  data: IPutGroupPersonDto,
  refetch: () => void
) => {
  try {
    const response = await putGroupPerson(id, data);
    if (response) {
      refetch();
    }
    return response;
  } catch (e) {
    notification.error({
      message: "Error",
      description: "Some error happened",
    });
  }
};
