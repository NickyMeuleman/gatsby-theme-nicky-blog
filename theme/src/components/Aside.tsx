/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

const Aside: React.FC = ({ children }) => (
  <aside
    sx={{
      borderLeft: `3px solid`,
      borderLeftColor: `primary`,
      borderRadius: `0 0.25rem 0.25rem 0`,
      fontStyle: `italic`,
      mt: 3,
      mx: `-5vw`,
      px: `5vw`,
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
