import React, { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, List, Space } from "antd";
import { getTasks } from "api/group.api";
import { useAuth } from "contexts/authContext";
import { useModal } from "hooks";
import IsShow from "settings/IsShow";
import { IGroupTask } from "types/groupTypes";

import AddTaskModal from "../../Modal/AddTaskModal";

import { useQuery } from "@tanstack/react-query";

const TasksTab: FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isShow, handleShowModal, handleHideModal } = useModal();
  const [taskId, setTaskId] = useState<number | undefined>();
  const { data } = useQuery<IGroupTask[]>({
    queryKey: ["getTasks", id],
    queryFn: () => getTasks(id),
    retry: false,
    refetchOnWindowFocus: false,
  });
  const handleEdit = (data: any) => {};
  const handleDelete = (data: any) => {};
  const handleAddTask = (taskId: number) => {
    setTaskId(taskId);
    handleShowModal();
  };
  return (
    <>
      <List
        dataSource={data}
        renderItem={(item) => (
          <Link to={`/task/${item.id}`} key={item.id}>
            <List.Item
              style={{ borderBlockEnd: "1px solid rgba(5, 5, 5, 0.06)" }}
              actions={[
                <IsShow rule={user?.id === item.createByUserId}>
                  <Space key="actions">
                    <Button type="link" onClick={() => handleAddTask(item.id)}>
                      Add task
                    </Button>
                    <Button type="primary" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button danger onClick={() => handleDelete(item)}>
                      Delete
                    </Button>
                  </Space>
                </IsShow>,
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          </Link>
        )}
      />
      <AddTaskModal
        visible={isShow}
        onCancel={handleHideModal}
        taskId={taskId}
      />
    </>
  );
};

export default TasksTab;
