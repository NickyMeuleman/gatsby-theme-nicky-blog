/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import { Header } from "./Header";
import { Main } from "./Main";
import { MDXProvider } from "@mdx-js/react";
import { Aside } from "./mdx-components";
import Mdxcomponents from "../gatsby-plugin-theme-ui/components";

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => (
  <MDXProvider components={{ ...Mdxcomponents, Aside }}>
    <Box
      sx={{
        minHeight: `100vh`,
        display: `flex`,
        flexDirection: `column`,
        variant: `styles.Layout`,
      }}
    >
      <Header {...props} />
      <Main {...props}>{children}</Main>
    </Box>
  </MDXProvider>
);

export { Layout };
