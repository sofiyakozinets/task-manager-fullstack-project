"use client";

import React from "react";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "./getQueryClient";

const Providers = ({
  children
}: Readonly<{
  children: React.ReactElement;
}>): React.ReactElement => (
  <QueryClientProvider client={getQueryClient()}>
    <MantineProvider>{children}</MantineProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default Providers;
