/** @jsx jsx */
import React from "react"
import { jsx, Box } from "theme-ui"
import { MDXProvider } from "@mdx-js/react"
import Header from "./Header"
import Main from "./Main"
import GlobalStyles from "./GlobalStyles"
import * as mdxComponents from "./mdx-components"

const Layout: React.FC = ({ children, ...props }) => (
  <MDXProvider components={mdxComponents as any}>
    <Box
      sx={{
        minHeight: `100vh`,
        display: `flex`,
        flexDirection: `column`,
        variant: `styles.Layout`,
      }}
    >
      <GlobalStyles />
      <Header {...props} />
      <Main {...props}>{children}</Main>
    </Box>
  </MDXProvider>
)

export default Layout
