import React from "react"
import { Main, Container } from "theme-ui"

export default ({ children, title, ...props }) => {
  return (
    <Main>
      <Container>{children}</Container>
    </Main>
  )
}
