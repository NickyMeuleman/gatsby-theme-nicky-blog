import React from "react"
import { Layout } from "theme-ui"
import Header from "./Header"
import Main from "./Main"
import GlobalStyles from "./GlobalStyles"

export default ({ children, ...props }) => (
  <Layout>
    <GlobalStyles />
    <Header {...props} />
    <Main {...props}>{children}</Main>
  </Layout>
)
