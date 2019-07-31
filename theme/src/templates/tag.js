import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TagPage from "../components/TagPage"

const TagTemplate = ({ data, pageContext }) => {
  const pageData = {
    amount: data.allBlogPost.totalCount,
    name: data.tag.name,
    posts: data.allBlogPost.edges.map(edge => edge.node),
  }

  return (
    <Layout>
      <TagPage data={pageData} basePath={pageContext.basePath} />
    </Layout>
  )
}

export const tagTemplateQuery = graphql`
  query TagTemplateQuery($slug: String) {
    allBlogPost(
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          slug
          title
        }
      }
      totalCount
    }
    tag(slug: { eq: $slug }) {
      name
    }
  }
`

export default TagTemplate
