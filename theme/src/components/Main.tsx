import React from "react"
import { Main, Container } from "theme-ui"

const MainComponent: React.FC = ({ children }) => (
  <Main>
    <Container>{children}</Container>
  </Main>
)

export default MainComponent
