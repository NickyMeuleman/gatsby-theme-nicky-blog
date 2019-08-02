import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TagList from "../components/TagList"
import SEO from "../components/SEO"

const TagsTemplate = ({ data, pageContext, location }) => {
  const tagData = data.allTag.group.reduce((acc, item) => {
    return [
      ...acc,
      {
        name: item.edges[0].node.name,
        slug: item.edges[0].node.slug,
        amount: item.totalCount,
      },
    ]
  }, [])

  return (
    <Layout>
      <SEO
        title="Tags"
        description="List of post tags"
        slug={pageContext.slug}
        basePath={pageContext.basePath}
        location={location}
      />
      <TagList tags={tagData} basePath={pageContext.basePath} />
    </Layout>
  )
}

export const tagsTemplateQuery = graphql`
  query TagsTemplateQuery {
    allTag {
      group(field: slug, limit: 1) {
        edges {
          node {
            name
            slug
          }
        }
        totalCount
      }
    }
  }
`

export default TagsTemplate
