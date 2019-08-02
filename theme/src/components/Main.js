import React from "react"
import { Main, Container } from "theme-ui"

export default ({ children }) => {
  return (
    <Main>
      <Container>{children}</Container>
    </Main>
  )
}
