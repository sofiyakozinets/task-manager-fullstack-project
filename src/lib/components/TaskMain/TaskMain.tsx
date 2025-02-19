"use client";

import React from "react";
import { Box, Text } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteTask, fetchTask, updateTask } from "lib/api";
import { CompletedInterface, ID, IDInterface } from "lib/types";
import { getQueryClient } from "lib/utils/getQueryClient";

import TaskExpanded from "../TaskExpanded";

const TaskMain = ({ taskId }: { taskId: ID }) => {
  const router = useRouter();

  const {
    data: task,
    error,
    isPending
  } = useQuery({
    enabled: Boolean(taskId),
    queryFn: () => fetchTask({ id: taskId }),
    queryKey: ["task", taskId]
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (): void => {
      router.push("/");
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (): void => {
      getQueryClient().invalidateQueries({ queryKey: ["task", taskId] });
    }
  });

  const handleCompleteTaskToggle = ({
    completed,
    id
  }: IDInterface & CompletedInterface): void => {
    updateTaskMutation.mutate({ completed, id });
  };

  const handleDeleteTask = ({ id }: IDInterface): void => {
    deleteTaskMutation.mutate({ id });
  };

  if (isPending) return <Text m="lg">Loading...</Text>;
  if (error) return <Text m="lg">Error: {error.message}</Text>;
  if (!task) return <Text m="lg">Task with this ID does not exist...</Text>;

  return (
    <Box p="lg">
      <TaskExpanded
        color={task.color}
        completed={task.completed}
        description={task.description}
        onCompleteToggle={() =>
          handleCompleteTaskToggle({
            completed: !task.completed,
            id: task.id
          })
        }
        onDelete={() => handleDeleteTask({ id: task.id })}
        title={task.title}
      />
    </Box>
  );
};

export default TaskMain;
