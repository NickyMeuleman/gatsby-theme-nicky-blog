import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Styled, Header } from "theme-ui"

export default ({ title }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const siteTitle = data.site.siteMetadata.title
  return (
    <Header>
      <Styled.h1>
        <Styled.a as={Link} to="/">
          {title || siteTitle}
        </Styled.a>
      </Styled.h1>
    </Header>
  )
}
