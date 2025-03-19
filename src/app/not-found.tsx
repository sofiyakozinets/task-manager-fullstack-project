"use client";

import React from "react";
import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <Container size="lg">
      <Stack align="center" gap="md" h="100vh" justify="center" ta="center">
        <Title order={1}>404 - Page Not Found</Title>
        <Text c="dimmed" size="lg">
          The page you are looking for does not exist.
        </Text>
        <Button mt="xs" onClick={() => router.push("/")} size="md">
          Go back home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
