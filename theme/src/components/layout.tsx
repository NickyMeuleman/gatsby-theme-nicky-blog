/** @jsx jsx */
import React from "react"
import { jsx, Box } from "theme-ui"
import Header from "./Header"
import Main from "./Main"

const Layout: React.FC = ({ children, ...props }) => (
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
)

export default Layout
