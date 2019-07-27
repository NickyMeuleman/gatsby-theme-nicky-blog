import React from "react"
import { css, Global } from "@emotion/core"

export default () => {
  return (
    <Global
      styles={css`
        body {
          margin: 0;
        }
      `}
    />
  )
}
