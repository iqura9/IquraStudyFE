import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, notification } from "antd";
import { deleteGroup, getGroup } from "api/group.api";
import DeleteConfirmationModal from "components/Modal/DeleteModal";
import { useAuth } from "contexts/authContext";
import { useModal } from "hooks";
import { Paths } from "routes/paths";
import IsShow from "settings/IsShow";

import GroupDetails from "./components/GroupDetails";
import InviteModal from "./components/InviteModal";

import { useMutation, useQuery } from "@tanstack/react-query";

const GroupPage = () => {
  const navigation = useNavigate();
  const { isShow, handleShowModal, handleHideModal } = useModal();
  const {
    isShow: IsShowDeleteModal,
    handleShowModal: handleDeleteShowModal,
    handleHideModal: handleDeleteHideModal,
  } = useModal();
  const { id } = useParams();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["getGroup", id],
    queryFn: () => getGroup(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteFn } = useMutation<unknown, Error>({
    mutationKey: ["deleteGroup", id],
    mutationFn: () => deleteGroup(id),
    onSuccess: () => {
      navigation(Paths.groups);
      notification.success({ message: "Group successfully was deleted" });
    },
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const invitationToken = `${
    import.meta.env.VITE_BASE_CLIENT_URL
  }/invite-to-group?token=${id}&groupName=${data?.name}`;

  const handleEdit = () => {
    navigation(`${Paths.editGroup}/${id}`, { state: { name: data?.name } });
  };

  const handleDelete = () => {
    deleteFn();
  };

  if (!data) return <></>;

  return (
    <div>
      <IsShow rule={user?.id === data.createdByUserId}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "16px",
            gap: "8px",
          }}
        >
          <Button type="link" onClick={handleShowModal}>
            Invite students
          </Button>
          <Link to={Paths.createTask}>
            <Button type="primary">Create the task</Button>
          </Link>
          <Button type="default" onClick={handleEdit}>
            Edit Group
          </Button>
          <Button danger onClick={handleDeleteShowModal}>
            Delete Group
          </Button>
        </div>
      </IsShow>

      <GroupDetails group={data} />
      <InviteModal
        visible={isShow}
        onCancel={handleHideModal}
        invitationToken={invitationToken}
      />
      <DeleteConfirmationModal
        visible={IsShowDeleteModal}
        onCancel={handleDeleteHideModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default GroupPage;
