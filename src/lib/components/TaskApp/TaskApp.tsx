"use client";

import React from "react";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar
} from "@mantine/core";

import { IDInterface } from "lib/types";

import Header from "../Header";
import TaskMain from "../TaskMain";
import TaskNavbar from "../TaskNavbar";

const TaskApp = ({ id }: IDInterface) => (
  <AppShell
    header={{ height: 80 }}
    navbar={{
      breakpoint: "sm",
      width: 300
    }}
  >
    <AppShellHeader>
      <Header />
    </AppShellHeader>
    <AppShellNavbar>
      <TaskNavbar />
    </AppShellNavbar>
    <AppShellMain>
      <TaskMain taskId={id} />
    </AppShellMain>
  </AppShell>
);

export default TaskApp;
