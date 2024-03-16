import { FormattedMessage } from "react-intl"; // Import FormattedMessage from react-intl
import { Button, notification, Space, Tag } from "antd";
import { putGroupPerson } from "api/group.api";
import IsShow from "settings/IsShow";
import { RoleType } from "types/authTypes";
import { UserStatus } from "types/generaTypes";
import { IGroupPeople } from "types/groupTypes";

// Define column titles using translated strings
export const columns = [
  {
    title: (
      <FormattedMessage id="group.detail.component.accept.item.username" />
    ),
    dataIndex: "userName",
    key: "userName",
    align: "left" as const,
  },
  {
    title: <FormattedMessage id="group.detail.component.accept.item.email" />,
    dataIndex: "email",
    key: "email",
    align: "center" as const,
  },
  {
    title: <FormattedMessage id="group.detail.component.accept.item.image" />,
    dataIndex: "image",
    key: "image",
    render: (imageUrl: string) =>
      imageUrl ? <img src={imageUrl} style={{ maxWidth: "50px" }} /> : "",
    align: "center" as const,
  },
  {
    title: (
      <FormattedMessage id="group.detail.component.accept.item.description" />
    ),
    dataIndex: "description",
    key: "description",
    align: "center" as const,
  },
  {
    title: <FormattedMessage id="group.detail.component.accept.item.role" />,
    dataIndex: "role",
    key: "role",
    render: (role: RoleType) => (
      <Tag color={role === "Teacher" ? "gold" : "blue"}>{role}</Tag>
    ),
    align: "center" as const,
  },
  {
    title: (
      <FormattedMessage id="group.detail.component.accept.item.userStatus" />
    ),
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
    title: (
      <FormattedMessage id="group.detail.component.accept.item.createdAt" />
    ),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    align: "center" as const,
  },
  {
    title: (
      <FormattedMessage id="group.detail.component.accept.item.updatedAt" />
    ),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (updatedAt: string) =>
      updatedAt ? new Date(updatedAt).toLocaleDateString() : "-",
    align: "center" as const,
  },
  {
    title: <FormattedMessage id="group.detail.component.accept.item.accept" />,
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
            <FormattedMessage id="group.detail.component.accept.item.accept" />
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
            <FormattedMessage id="group.detail.component.accept.item.decline" />
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
      message: <FormattedMessage id="common.error" />,
      description: (
        <FormattedMessage id="group.detail.component.accept.notification.error.description" />
      ),
    });
  }
};
