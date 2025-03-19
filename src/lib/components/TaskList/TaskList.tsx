"use client";

import React, { useMemo } from "react";
import { SimpleGrid } from "@mantine/core";

import { ID, TaskInterface } from "lib/types";

import Task from "../Task";

const sortTasks = <T extends { completed: boolean }>(tasks: T[]): T[] => {
  const toDoTasks: T[] = tasks.filter((task: T) => !task.completed);
  const completedTasks: T[] = tasks.filter((task: T) => task.completed);

  return [...toDoTasks, ...completedTasks];
};

type TaskListProps = {
  tasks: Array<TaskInterface>;
  onCompleteTaskToggle: (args: { id: ID; completed: boolean }) => void;
  onDeleteTask: (args: { id: ID }) => void;
  onOpen: (args: { id: ID }) => void;
};

const TaskList = React.memo(
  ({ onCompleteTaskToggle, onDeleteTask, onOpen, tasks }: TaskListProps) => {
    const sortedTasks: TaskInterface[] = useMemo(
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
  }
);

TaskList.displayName = "TaskList";

export default TaskList;
