import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlogList from "../components/BlogList"
import Pagination from "../components/Pagination"
import SEO from "../components/SEO"
import { IBlogPostListTemplateQuery, IBlogPostListPageContext } from "../types"

interface IProps {
  data: IBlogPostListTemplateQuery
  pageContext: IBlogPostListPageContext
}

const BlogPostsTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const blogposts = data.allBlogPost.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO basePath={pageContext.basePath} />
      <BlogList
        blogPosts={blogposts}
        totalCount={data.allBlogPost.totalCount}
        basePath={pageContext.basePath}
      />
      {pageContext.numPages ? (
        <Pagination context={pageContext} basePath={pageContext.basePath} />
      ) : null}
    </Layout>
  )
}

export const BlogPostListTemplateQuery = graphql`
  query BlogPostListTemplateQuery($skip: Int, $limit: Int) {
    allBlogPost(
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { published: { ne: false } }
    ) {
      totalCount
      edges {
        node {
          id
          authors {
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

export default BlogPostsTemplate
