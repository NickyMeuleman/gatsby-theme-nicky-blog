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
    <Box
      sx={{
        width: `100%`,
        minWidth: 0,
        maxWidth: 1024,
        mx: `auto`,
        p: 4,
        variant: `styles.Container`,
      }}
    >
      {children}
    </Box>
  </Box>
)

export default MainComponent
