/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import { Header } from "./Header";
import { Main } from "./Main";
import { MDXProvider } from "@mdx-js/react";
import MdxComponents from "./mdx-components";

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => (
  //@ts-ignore because MdxComponents has ...headingObj
  <MDXProvider components={MdxComponents}>
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
