import React from "react"
import Layout from "../components/layout"
import TagPage from "../components/TagPage"
import { graphql } from "gatsby";

const TagTemplate = ({ data, pageContext }) => {
  // combine graphql data with tag name provided via pageContext
  const tagData = Object.assign(data, { name: pageContext.name })
  return (
    <Layout>
      <TagPage data={tagData} />
    </Layout>
  )
}

export const tagTemplateQuery = graphql`
  query tagTemplateQuery($name: String) {
    allBlogPost(
      sort: { fields: date, order: DESC }
      filter: { tags: { in: [$name] } }
    ) {
      totalCount
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

export default TagTemplate
