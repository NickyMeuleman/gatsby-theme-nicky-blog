import React from "react"
import { css, Global } from "@emotion/core"

export default (): any => (
  <Global
    styles={css`
      body {
        margin: 0;
      }
    `}
  />
)
