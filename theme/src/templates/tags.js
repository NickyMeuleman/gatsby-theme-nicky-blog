import React from "react"
import Layout from "../components/layout";
import TagList from "../components/TagList";
import { graphql } from "gatsby";

const TagsTemplate = ({
  data: {
    allBlogPost: { group },
  },
  pageContext,
}) => {
  // create tags array that hold objects of type: {tag: string, amount: number, slug: string}
  // done by combining info in group (from graphql) and pageContext
  const tags = group.reduce((acc, item) => {
    const name = item.fieldValue
    const amount = item.totalCount
    const slug = pageContext.tagList.find(
      ctxObj => ctxObj.name === item.fieldValue
    ).slug
    return [...acc, { name, amount, slug }]
  }, [])
  return (
    <Layout>
      <TagList tags={tags}/>
    </Layout>
  )
}

export const tagsTemplateQuery = graphql`
  query {
    allBlogPost {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default TagsTemplate
