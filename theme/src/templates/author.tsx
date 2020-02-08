import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import AuthorPage from "../components/AuthorPage"
import { IAuthorTemplateQuery, IAuthorPageContext } from "../types"

interface IProps {
  data: IAuthorTemplateQuery
  pageContext: IAuthorPageContext
}

const TagTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    amount: data.allBlogPost.totalCount,
    author: data.author,
    posts: data.allBlogPost.edges.map(edge => edge.node),
  }

  return (
    <Layout>
      <AuthorPage data={pageData} pageContext={pageContext} />
    </Layout>
  )
}

export const authorTemplateQuery = graphql`
  query authorTemplateQuery($shortName: String) {
    author(shortName: { eq: $shortName }) {
      name
      shortName
      twitter
    }
    allBlogPost(
      sort: { fields: [date], order: DESC }
      filter: {
        authors: { elemMatch: { shortName: { eq: $shortName } } }
        published: { ne: false }
      }
    ) {
      totalCount
      edges {
        node {
          id
          authors {
            shortName
            name
          }
          title
          slug
          date
          cover {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`

export default TagTemplate
