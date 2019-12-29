import React from "react"
import { Layout as ThemeLayout } from "theme-ui"
import Header from "./Header"
import Main from "./Main"
import GlobalStyles from "./GlobalStyles"

interface IProps {
  [key: string]: any
  children?: any
}

const Layout: React.FC<IProps> = ({ children, ...props }) => (
  <ThemeLayout>
    <GlobalStyles />
    <Header {...props} />
    <Main {...props}>{children}</Main>
  </ThemeLayout>
)

export default Layout
