/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { ITagListPageData, ITagListPageContext } from "../types"
import SEO from "./SEO"

interface IProps {
  data: ITagListPageData
  pageContext: ITagListPageContext
}

const TagList: React.FC<IProps> = ({ data, pageContext }) => {
  const { tags } = data
  const { basePath } = pageContext

  return (
    <React.Fragment>
      <SEO
        title="Tags"
        description="List of post tags"
        slug="tag"
        basePath={pageContext.basePath}
      />
      <ul>
        {tags.map(tag => (
          <li key={tag.slug} sx={{ margin: 1 }}>
            <Link
              to={`${
                basePath === `/` || basePath === `` ? `` : `/`
              }${basePath}/tag/${tag.slug}`}
              sx={{
                variant: `styles.a`,
              }}
            >
              {tag.name} ({tag.amount})
            </Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default TagList
