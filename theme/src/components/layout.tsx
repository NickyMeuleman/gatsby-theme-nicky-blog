import React from "react"
import { Layout as ThemeLayout } from "theme-ui"
import { MDXProvider } from "@mdx-js/react"
import Header from "./Header"
import Main from "./Main"
import GlobalStyles from "./GlobalStyles"
import * as mdxComponents from "./mdx-components"

const Layout: React.FC = ({ children, ...props }) => (
  <MDXProvider components={mdxComponents as any}>
    <ThemeLayout>
      <GlobalStyles />
      <Header {...props} />
      <Main {...props}>{children}</Main>
    </ThemeLayout>
  </MDXProvider>
)

export default Layout
