import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TagPage from "../components/TagPage"
import SEO from "../components/SEO"
import { ITagPageContext } from "../types"

interface IProps {
  data: {
    allBlogPost: {
      edges: { node: { slug: string; title: string } }[]
      totalCount: number
    }
    tag: { name: string }
  }
  pageContext: ITagPageContext
}

const TagTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    amount: data.allBlogPost.totalCount,
    name: data.tag.name,
    posts: data.allBlogPost.edges.map(edge => edge.node),
  }

  return (
    <Layout>
      <SEO
        title={`Tagged "${data.tag.name}"`}
        description={`List of posts tagged with "${data.tag.name}"`}
        slug={`tag/${pageContext.slug}`}
        basePath={pageContext.basePath}
        keywords={[`tag`, data.tag.name]}
      />
      <TagPage data={pageData} basePath={pageContext.basePath} />
    </Layout>
  )
}

export const tagTemplateQuery = graphql`
  query TagTemplateQuery($slug: String) {
    allBlogPost(
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      sort: { fields: [date], order: DESC }
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
