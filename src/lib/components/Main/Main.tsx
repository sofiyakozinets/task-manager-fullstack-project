"use client";

import React, { useCallback } from "react";
import { Box, Text, Title } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteTask, fetchTasks, updateTask } from "lib/api";
import { ID } from "lib/types";
import { getQueryClient } from "lib/utils/getQueryClient";

import TaskList from "../TaskList";

const Main = () => {
  const router = useRouter();

  const {
    data: tasks,
    error,
    isPending
  } = useQuery({
    queryFn: fetchTasks,
    queryKey: ["tasks"]
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (): void => {
      getQueryClient().invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (_, variables): void => {
      getQueryClient().invalidateQueries({ queryKey: ["tasks"] });
      getQueryClient().invalidateQueries({ queryKey: ["task", variables.id] });
    }
  });

  const handleCompleteTaskToggle = useCallback(
    ({ completed, id }: { id: ID; completed: boolean }): void => {
      updateTaskMutation.mutate({ completed, id });
    },
    [updateTaskMutation]
  );

  const handleDeleteTask = useCallback(
    ({ id }: { id: ID }): void => {
      deleteTaskMutation.mutate({ id });
    },
    [deleteTaskMutation]
  );

  const handleOpen = useCallback(
    ({ id }: { id: ID }): void => {
      router.push(`/task/${id}`);
    },
    [router]
  );

  if (isPending) return <Text m="lg">Loading...</Text>;
  if (error) return <Text m="lg">Error: {error.message}</Text>;

  return (
    <Box p="lg">
      <Title mb="md" order={2}>
        All tasks
      </Title>
      {tasks.length ? (
        <TaskList
          onCompleteTaskToggle={handleCompleteTaskToggle}
          onDeleteTask={handleDeleteTask}
          onOpen={handleOpen}
          tasks={tasks}
        />
      ) : (
        <Text c="dimmed">No tasks yet...</Text>
      )}
    </Box>
  );
};

export default Main;
