import React from "react"
import { graphql } from "gatsby"
import TagPage from "../components/TagPage"
import { ITagPageContext, ITagTemplateQuery } from "../types"

interface IProps {
  data: ITagTemplateQuery
  pageContext: ITagPageContext
}

const TagTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    amount: data.allBlogPost.totalCount,
    name: data.tag.name,
    posts: data.allBlogPost.nodes,
  }

  return <TagPage data={pageData} pageContext={pageContext} />
}

export const tagTemplateQuery = graphql`
  query tagTemplateQuery($slug: String) {
    allBlogPost(
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      sort: { fields: [date], order: DESC }
    ) {
      nodes {
        slug
        title
      }
      totalCount
    }
    tag(slug: { eq: $slug }) {
      name
    }
  }
`

export default TagTemplate
