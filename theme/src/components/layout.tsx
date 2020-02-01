/** @jsx jsx */
import React from "react"
import { jsx, Box } from "theme-ui"
import { MdxEmbedProvider } from "@pauliescanlon/gatsby-mdx-embed"
import Header from "./Header"
import Main from "./Main"

// manually add MdxEmbedProvider from gatsby-mdx-embed. The gatsby-browser it uses seems to not get applied correctly.
const Layout: React.FC = ({ children, ...props }) => (
  <MdxEmbedProvider>
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
  </MdxEmbedProvider>
)

export default Layout
