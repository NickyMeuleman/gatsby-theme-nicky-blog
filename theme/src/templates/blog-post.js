import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlogPost from "../components/BlogPost"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.blogPost

  return (
    <Layout>
      <BlogPost
        post={post}
        context={pageContext}
        basePath={pageContext.basePath}
      />
    </Layout>
  )
}

export const query = graphql`
  query BlogPostTemplateQuery($slug: String!) {
    blogPost(slug: { eq: $slug }) {
      excerpt
      id
      slug
      body
      tags {
        name
        slug
      }
      title
      cover {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`

export default BlogPostTemplate
