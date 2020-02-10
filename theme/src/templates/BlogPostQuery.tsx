import React from "react"
import { graphql } from "gatsby"
import BlogPostPage from "../components/BlogPostPage"
import { IBlogPostPageContext, IBlogPostTemplateQuery } from "../types"

interface IProps {
  data: IBlogPostTemplateQuery
  pageContext: IBlogPostPageContext
}

const BlogPostTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    post: data.blogPost,
  }

  return <BlogPostPage data={pageData} pageContext={pageContext} />
}

export const blogPostTemplateQuery = graphql`
  query blogPostTemplateQuery($slug: String!) {
    blogPost(slug: { eq: $slug }) {
      excerpt
      id
      slug
      date
      canonicalUrl
      keywords
      body
      tags {
        name
        slug
      }
      authors {
        shortName
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
