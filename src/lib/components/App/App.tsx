"use client";

import React from "react";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar
} from "@mantine/core";

import Header from "../Header";
import Main from "../Main";
import Navbar from "../Navbar";

const App = () => (
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
      <Navbar />
    </AppShellNavbar>
    <AppShellMain>
      <Main />
    </AppShellMain>
  </AppShell>
);

export default App;
