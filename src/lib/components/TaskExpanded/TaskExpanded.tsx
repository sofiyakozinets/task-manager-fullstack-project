"use client";

import React from "react";
import { Button, Card, Group, Text, Title } from "@mantine/core";

import { COLORS } from "lib/constants/colors";
import { TaskComponentProps, TaskVariant } from "lib/types";

type TaskExpandedProps = TaskComponentProps<TaskVariant.Expanded>;

const TaskExpanded = ({
  color,
  completed,
  description,
  onCompleteToggle,
  onDelete,
  title
}: TaskExpandedProps) => (
  <Card
    data-cy="task-expanded"
    mx="auto"
    padding="xl"
    radius="lg"
    shadow="md"
    style={{ background: COLORS[color] }}
    w={600}
    withBorder
  >
    <Title order={2}>{title}</Title>
    {description && (
      <Text c="dimmed" mt="md" size="lg">
        {description}
      </Text>
    )}
    <Group justify="space-between" mt="xl">
      <Button
        data-cy="task-expanded-complete-button"
        onClick={onCompleteToggle}
        size="md"
        variant={completed ? "outline" : "light"}
      >
        {completed ? "Undo" : "Complete"}
      </Button>
      <Button
        color="red"
        data-cy="task-expanded-delete-button"
        onClick={onDelete}
        size="md"
        variant="light"
      >
        Delete
      </Button>
    </Group>
  </Card>
);

export default TaskExpanded;
