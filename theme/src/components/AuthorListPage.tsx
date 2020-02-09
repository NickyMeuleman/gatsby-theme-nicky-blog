/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import SEO from "./SEO"
import { IAuthorListPageContext, IAuthorListPageData } from "../types"

interface IProps {
  data: IAuthorListPageData
  pageContext: IAuthorListPageContext
}

const AuthorListPage: React.FC<IProps> = ({ data, pageContext }) => {
  const { authors } = data
  const { basePath } = pageContext

  return (
    <React.Fragment>
      <SEO title={`${data.amount} Authors`} slug="author" basePath={basePath} />
      <ul>
        {authors.map(author => (
          <li key={author.id} sx={{ margin: 1 }}>
            <Link
              to={`/author/${author.shortName}`}
              sx={{ variant: `styles.a` }}
            >
              {author.name}
            </Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default AuthorListPage
