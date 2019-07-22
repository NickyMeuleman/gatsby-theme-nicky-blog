import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlogList from "../components/BlogList"
import Pagination from "../components/Pagination"

const BlogPostsTemplate = ({ data, pageContext }) => {
  const blogposts = data.allBlogPost.edges.map(edge => edge.node)
  return (
    <Layout>
      <BlogList
        blogPosts={blogposts}
        totalCount={data.allBlogPost.totalCount}
        basePath={pageContext.basePath}
      />
      <Pagination context={pageContext} />
    </Layout>
  )
}

export const BlogPostsTemplateQuery = graphql`
  query BlogPostsTemplateQuery($skip: Int!, $limit: Int!) {
    allBlogPost(
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          author
          tags
          title
          slug
          date(formatString: "DD MMMM, YYYY")
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
