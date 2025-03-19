"use client";

import React from "react";
import { Modal } from "@mantine/core";

import CreateTaskForm from "../CreateTaskForm";

type CreateTaskModalProps = {
  opened: boolean;
  close: () => void;
};

const CreateTaskModal = React.memo(
  ({ close, opened }: CreateTaskModalProps) => (
    <Modal
      centered
      data-cy="create-task-modal"
      onClose={close}
      opened={opened}
      title="Create a task"
    >
      <CreateTaskForm onSubmitCallback={close} />
    </Modal>
  )
);

CreateTaskModal.displayName = "CreateTaskModal";

export default CreateTaskModal;
