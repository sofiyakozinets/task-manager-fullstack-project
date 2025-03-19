"use client";

import React from "react";
import { Box, Group, NavLink, Title } from "@mantine/core";
import Image from "next/image";

const Header = () => (
  <Group h="100%" justify="space-between" px="md" w="100%">
    <Title order={1}>Task Manager</Title>
    <Box>
      <NavLink
        href="https://github.com/sofiyakozinets/task-manager-fullstack-project"
        label="Go to Github.com →"
        leftSection={
          <Image alt="" aria-hidden height={24} src="/github.svg" width={24} />
        }
        target="_blank"
      />
    </Box>
  </Group>
);

export default Header;
