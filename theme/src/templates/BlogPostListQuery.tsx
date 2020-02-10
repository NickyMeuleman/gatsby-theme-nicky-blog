import React from "react"
import { graphql } from "gatsby"
import BlogPostListPage from "../components/BlogPostListPage"
import { IBlogPostListTemplateQuery, IBlogPostListPageContext } from "../types"

interface IProps {
  data: IBlogPostListTemplateQuery
  pageContext: IBlogPostListPageContext
}

const BlogPostListTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    blogPosts: data.allBlogPost.nodes,
    amount: data.allBlogPost.totalCount,
    paginationContext: pageContext.numPages ? pageContext : null,
  }

  return <BlogPostListPage data={pageData} pageContext={pageContext} />
}

export const blogPostListTemplateQuery = graphql`
  query blogPostListTemplateQuery($skip: Int, $limit: Int) {
    allBlogPost(
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { published: { ne: false } }
    ) {
      totalCount
      nodes {
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
`

export default BlogPostListTemplate
