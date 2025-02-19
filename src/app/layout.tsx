import React from "react";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import Providers from "lib/utils/providers";

import "@mantine/core/styles.css";

const Layout = ({
  children
}: Readonly<{
  children: React.ReactElement;
}>) => (
  <html lang="en" {...mantineHtmlProps}>
    <head>
      <title>Task Manager</title>
      <ColorSchemeScript />
    </head>
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default Layout;
