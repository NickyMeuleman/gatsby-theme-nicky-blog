import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TagPage from "../components/TagPage"

const TagTemplate = ({ data, pageContext }) => {
  // combine graphql data pageContext
  const tagData = Object.assign(data, pageContext)

  return (
    <Layout>
      <TagPage data={tagData} basePath={pageContext.basePath} />
    </Layout>
  )
}

export const tagTemplateQuery = graphql`
  query tagTemplateQuery($slug: String) {
    allBlogPost(
      sort: { fields: date, order: DESC }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
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
