"use client";

import React from "react";
import { ActionIcon, Button, Card, Group, Text, Title } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

import { COLORS } from "lib/constants/colors";
import { TaskComponentProps, TaskVariant } from "lib/types";

import styles from "./task.module.css";

type TaskProps = TaskComponentProps<TaskVariant.Default>;

const Task = ({
  color,
  completed,
  description,
  onCompleteToggle,
  onDelete,
  onOpen,
  title
}: TaskProps) => (
  <Card
    className={styles.card}
    data-cy="task-item"
    padding="lg"
    radius="md"
    shadow="sm"
    style={{ background: COLORS[color] }}
    withBorder
  >
    <Title order={3}>{title}</Title>
    {description && (
      <Text c="dimmed" mt="xs">
        {description}
      </Text>
    )}
    <Group justify="space-between" mt="lg">
      <Group>
        <Button
          data-cy="task-complete-button"
          onClick={onCompleteToggle}
          variant={completed ? "outline" : "light"}
        >
          {completed ? "Undo" : "Complete"}
        </Button>
        <Button
          color="red"
          data-cy="task-delete-button"
          onClick={onDelete}
          variant="light"
        >
          Delete
        </Button>
      </Group>
      <ActionIcon
        aria-label="Open task"
        data-cy="task-open-icon"
        onClick={onOpen}
        variant="filled"
      >
        <IconExternalLink
          stroke={1.5}
          style={{ height: "70%", width: "70%" }}
        />
      </ActionIcon>
    </Group>
  </Card>
);

export default Task;
