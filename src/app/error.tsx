"use client";

import React from "react";
import {
  Button,
  Code,
  Container,
  Group,
  Stack,
  Text,
  Title
} from "@mantine/core";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => (
  <Container size="lg">
    <Stack align="center" gap="md" h="100vh" justify="center" ta="center">
      <Title order={1}>Something went wrong!</Title>
      <Text c="dimmed" size="lg">
        {error.message || "An unexpected error occurred."}
      </Text>
      <Stack gap="xs">
        <Text c="dimmed" size="sm">
          Stack Trace:
        </Text>
        <Code block h={200} w="100%">
          {error.stack}
        </Code>
      </Stack>
      <Group mt="md">
        <Button onClick={reset} size="md" variant="outline">
          Try again
        </Button>
        <Button
          onClick={(): void => {
            window.location.href = "/";
          }}
          size="md"
        >
          Go back home
        </Button>
      </Group>
    </Stack>
  </Container>
);

export default ErrorPage;
