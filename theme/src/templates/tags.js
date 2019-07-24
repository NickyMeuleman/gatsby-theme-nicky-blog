import React from "react"
import Layout from "../components/layout"
import TagList from "../components/TagList"

const TagsTemplate = ({ pageContext }) => {
  return (
    <Layout>
      <TagList tags={pageContext.tagList} basePath={pageContext.basePath} />
    </Layout>
  )
}

export default TagsTemplate
