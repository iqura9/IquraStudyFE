import { Button, notification } from "antd";
import { deleteGroup, getGroup } from "api/group.api";
import DeleteConfirmationModal from "components/Modal/DeleteModal";
import { useAuth } from "contexts/authContext";
import { useModal } from "hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const { data, error } = useQuery({
    queryKey: ["getGroup", id],
    queryFn: () => getGroup(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (error) {
      notification.error({ message: error.name, description: error.message });
      navigation(-1);
    }
  }, [error, navigation]);

  const { mutate: deleteFn } = useMutation<unknown, Error>({
    mutationKey: ["deleteGroup", id],
    mutationFn: () => deleteGroup(id),
    onSuccess: () => {
      navigation(Paths.groups);
      notification.success({
        message: <FormattedMessage id="group.page.notification.title" />,
      });
    },
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const invitationToken = `${
    import.meta.env.VITE_BASE_CLIENT_URL
  }/invite-to-group?token=${id}&groupName=${encodeURIComponent(
    data?.name || ""
  )}`;

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
            <FormattedMessage id="group.page.invite.title" />
          </Button>
          <Link to={`${Paths.createTask}/${id}`}>
            <Button type="primary">
              <FormattedMessage id="group.page.create.title" />
            </Button>
          </Link>
          <Button type="default" onClick={handleEdit}>
            <FormattedMessage id="group.page.edit.title" />
          </Button>
          <Button danger onClick={handleDeleteShowModal}>
            <FormattedMessage id="group.page.delete.title" />
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
