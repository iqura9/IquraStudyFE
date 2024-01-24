import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Button, List, Space } from "antd";
import { getTasks } from "api/group.api";
import { useAuth } from "contexts/authContext";
import IsShow from "settings/IsShow";
import { IGroupTask } from "types/groupTypes";

import { useQuery } from "@tanstack/react-query";

const TasksTab: FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data } = useQuery<IGroupTask[]>({
    queryKey: ["getTasks", id],
    queryFn: () => getTasks(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleEdit = (data: any) => {};
  const handleDelete = (data: any) => {};

  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <IsShow rule={user?.id === item.createByUserId}>
              <Space key="actions">
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
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default TasksTab;
