import React from "react"
import { Layout as ThemeLayout } from "theme-ui"
import { MDXProvider } from "@mdx-js/react"
import Header from "./Header"
import Main from "./Main"
import GlobalStyles from "./GlobalStyles"
import * as MdxComponents from "./mdx-components"

const mdxComponents = Object.entries(MdxComponents).reduce(
  (acc, [name, Component]) => ({
    ...acc,
    [name]: (props: any) => <Component {...props} />,
  }),
  {}
) as any

const Layout: React.FC = ({ children, ...props }) => (
  <MDXProvider components={mdxComponents}>
    <ThemeLayout>
      <GlobalStyles />
      <Header {...props} />
      <Main {...props}>{children}</Main>
    </ThemeLayout>
  </MDXProvider>
)

export default Layout
