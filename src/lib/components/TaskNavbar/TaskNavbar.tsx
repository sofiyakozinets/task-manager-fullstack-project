"use client";

import React from "react";
import { Box, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const TaskNavbar = () => {
  const router = useRouter();

  return (
    <Box p="lg">
      <Button
        data-cy="back-button"
        fullWidth
        leftSection={<IconArrowLeft size={16} />}
        onClick={() => router.push("/")}
        size="md"
        variant="outline"
      >
        Back to all tasks
      </Button>
    </Box>
  );
};

export default TaskNavbar;
