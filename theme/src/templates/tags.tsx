import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TagList from "../components/TagList"
import SEO from "../components/SEO"
import { ITagsPageContext, ITagSummary } from "../types"

interface IProps {
  data: {
    allTag: {
      group: {
        edges: {
          node: {
            name: string
            slug: string
          }
        }[]
        totalCount: number
      }[]
    }
  }
  pageContext: ITagsPageContext
}

const TagsTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const tagData = data.allTag.group.reduce<ITagSummary[]>(
    (acc, item) =>
      acc.concat({
        name: item.edges[0].node.name,
        slug: item.edges[0].node.slug,
        amount: item.totalCount,
      }),
    []
  )

  return (
    <Layout>
      <SEO
        title="Tags"
        description="List of post tags"
        slug="tag"
        basePath={pageContext.basePath}
      />
      <TagList tags={tagData} basePath={pageContext.basePath} />
    </Layout>
  )
}

export const tagsTemplateQuery = graphql`
  query TagsTemplateQuery {
    allTag(filter: { postPublished: { ne: false } }) {
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
