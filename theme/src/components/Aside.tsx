/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

const Aside: React.FC = ({ children }) => (
  <aside
    sx={{
      borderLeft: `3px solid`,
      borderLeftColor: `primary`,
      // TODO: theme-ui/color and get transparancy util so this can be themed
      backgroundColor: `#66339911`,
      // TODO: theme border values
      borderRadius: `0 0.25rem 0.25rem 0`,
      fontStyle: `italic`,
      mt: 3,
      px: 3,
      py: 3,
      "em, strong": {
        color: `inherit`,
      },
      p: {
        m: 0,
      },
    }}
  >
    {children}
  </aside>
)

export default Aside
