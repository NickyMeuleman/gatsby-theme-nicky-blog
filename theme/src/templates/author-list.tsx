import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { IAuthorListTemplateQuery, IAuthorListPageContext } from "../types"
import AuthorListPage from "../components/AuthorListPage"

interface IProps {
  data: IAuthorListTemplateQuery
  pageContext: IAuthorListPageContext
}

const AuthorListTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    authors: data.allAuthor.nodes,
    amount: data.allAuthor.totalCount,
  }

  return (
    <Layout>
      <AuthorListPage data={pageData} pageContext={pageContext} />
    </Layout>
  )
}

export const authorListTemplateQuery = graphql`
  query authorListTemplateQuery {
    allAuthor(sort: { fields: name, order: ASC }) {
      totalCount
      nodes {
        id
        name
        shortName
        twitter
      }
    }
  }
`

export default AuthorListTemplate
