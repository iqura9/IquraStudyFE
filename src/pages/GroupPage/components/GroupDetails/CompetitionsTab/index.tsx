import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, message, Modal, Table } from "antd";
import { api } from "api/index";
import useModal from "hooks/useModal";
import { useRole } from "hooks/useRole";
import CompetitionPage from "pages/Competition";

import { useMutation, useQuery } from "@tanstack/react-query";

export function CompetitionTab() {
  const { id } = useParams();
  const { isShow, handleShowModal, handleHideModal } = useModal();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data: groupCompetitions } = useQuery({
    queryKey: ["getCompetitions", id],
    queryFn: () =>
      api.apiCompetitionGroupGroupIdGet(Number(id)).then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: teacherCompetitions, isLoading } = useQuery({
    queryKey: ["getTeacherCompetitions"],
    queryFn: () => api.apiCompetitionTeacherGet().then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: addCompetitions, isLoading: isAdding } = useMutation({
    mutationFn: (selectedIds: number[]) =>
      api.apiCompetitionGroupPost({
        groupId: Number(id),
        competitionIds: selectedIds,
      }),
    onSuccess: () => {
      message.success("Competitions added successfully!");
      handleHideModal();
    },
    onError: () => {
      message.error("Failed to add competitions. Please try again.");
    },
  });

  const handleOk = () => {
    if (selectedRowKeys.length > 0) {
      addCompetitions(selectedRowKeys.map((key) => Number(key)));
    } else {
      message.warning("Please select at least one competition.");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
  ];

  const { isTeacher } = useRole();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {isTeacher ? (
        <div>
          <Button type="primary" onClick={handleShowModal}>
            Add competition
          </Button>
        </div>
      ) : null}

      <CompetitionPage data={groupCompetitions} />
      <Modal
        title="Add Competition"
        visible={isShow}
        onOk={handleOk}
        onCancel={handleHideModal}
        confirmLoading={isAdding}
        okText="Add Selected"
      >
        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          columns={columns}
          dataSource={teacherCompetitions}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </div>
  );
}
