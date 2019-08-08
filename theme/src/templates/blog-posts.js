import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlogList from "../components/BlogList"
import Pagination from "../components/Pagination"
import SEO from "../components/SEO"

const BlogPostsTemplate = ({ data, pageContext }) => {
  const blogposts = data.allBlogPost.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO />
      <BlogList
        blogPosts={blogposts}
        totalCount={data.allBlogPost.totalCount}
        basePath={pageContext.basePath}
      />
      {pageContext.numPages && (
        <Pagination context={pageContext} basePath={pageContext.basePath} />
      )}
    </Layout>
  )
}

export const BlogPostsTemplateQuery = graphql`
  query BlogPostsTemplateQuery($skip: Int, $limit: Int) {
    allBlogPost(
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { published: { ne: false } }
    ) {
      totalCount
      edges {
        node {
          ... on MdxBlogPost {
            id
            author {
              name
            }
            tags {
              name
              slug
            }
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
  }
`

export default BlogPostsTemplate
