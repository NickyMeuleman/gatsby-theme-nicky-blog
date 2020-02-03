/** @jsx jsx */
import React from "react"
import { jsx, Box } from "theme-ui"

const MainComponent: React.FC = ({ children }) => (
  <Box
    as="main"
    sx={{
      flex: `1 1 auto`,
      variant: `styles.Main`,
    }}
  >
    {children}
  </Box>
)

export default MainComponent
