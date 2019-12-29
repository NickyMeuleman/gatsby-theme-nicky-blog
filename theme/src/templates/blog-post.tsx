import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlogPost from "../components/BlogPost"
import { IBlogPost, IBlogPostPageContext } from "../types"

interface IProps {
  data: { blogPost: IBlogPost }
  pageContext: IBlogPostPageContext
}

const BlogPostTemplate: React.FC<IProps> = ({ data, pageContext }) => {
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
      canonicalUrl
      keywords
      body
      tags {
        name
        slug
      }
      authors {
        name
        twitter
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
