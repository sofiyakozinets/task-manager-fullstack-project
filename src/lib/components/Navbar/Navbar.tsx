"use client";

import React from "react";
import { Box, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import CreateTaskModal from "../CreateTaskModal";

type UseDisclosureReturn = [boolean, { close: () => void; open: () => void }];

const Navbar = () => {
  const [opened, { close, open }] = useDisclosure(
    false
  ) as unknown as UseDisclosureReturn;

  return (
    <Box p="lg">
      <Button
        data-cy="create-task-trigger-button"
        fullWidth
        leftSection={<IconPlus size={16} />}
        onClick={open}
        size="md"
        variant="outline"
      >
        Create a task
      </Button>
      <CreateTaskModal close={close} opened={opened} />
    </Box>
  );
};

export default Navbar;
