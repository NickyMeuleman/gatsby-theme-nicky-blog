import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import AuthorPage from "../components/AuthorPage"
import { IAuthorTemplateQuery, IAuthorPageContext } from "../types"

interface IProps {
  data: IAuthorTemplateQuery | any
  pageContext: IAuthorPageContext | any
}

const TagTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    amount: data.allBlogPost.totalCount,
    author: data.author,
    posts: data.allBlogPost.edges.map((edge: any) => edge.node),
  }

  return (
    <Layout>
      {/* <SEO
        title={`Author "${data.name}"`}
        slug={`author/${pageContext.slug}`}
        basePath={pageContext.basePath}
        keywords={[`tag`, data.tag.name]}
      /> */}
      <AuthorPage data={pageData} basePath={pageContext.basePath} />
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
