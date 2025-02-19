"use client";

import React, { useMemo } from "react";
import { SimpleGrid } from "@mantine/core";

import { CompletedInterface, IDInterface, TaskInterface } from "lib/types";

import Task from "../Task";

const sortTasks = <T extends CompletedInterface>(tasks: readonly T[]): T[] => {
  const toDoTasks: T[] = tasks.filter((task: T) => !task.completed);
  const completedTasks: T[] = tasks.filter((task: T) => task.completed);

  return [...toDoTasks, ...completedTasks];
};

type TaskListProps = {
  tasks: ReadonlyArray<TaskInterface>;
  onCompleteTaskToggle: ({
    completed,
    id
  }: IDInterface & CompletedInterface) => void;
  onDeleteTask: ({ id }: IDInterface) => void;
  onOpen: ({ id }: IDInterface) => void;
};

const TaskList = ({
  onCompleteTaskToggle,
  onDeleteTask,
  onOpen,
  tasks
}: TaskListProps) => {
  const sortedTasks: ReadonlyArray<TaskInterface> = useMemo(
    () => sortTasks<TaskInterface>(tasks),
    [tasks]
  );

  return (
    <SimpleGrid cols={3}>
      {sortedTasks.map((task: TaskInterface) => (
        <Task
          key={task.id}
          color={task.color}
          completed={task.completed}
          description={task.description}
          onCompleteToggle={() =>
            onCompleteTaskToggle({
              completed: !task.completed,
              id: task.id
            })
          }
          onDelete={() => onDeleteTask({ id: task.id })}
          onOpen={() => onOpen({ id: task.id })}
          title={task.title}
        />
      ))}
    </SimpleGrid>
  );
};

export default TaskList;
