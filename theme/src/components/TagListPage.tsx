/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Layout from "./Layout"
import SEO from "./SEO"
import { ITagListPageData, ITagListPageContext } from "../types"

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
        basePath={basePath}
      />
      <Layout>
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
      </Layout>
    </React.Fragment>
  )
}

export default TagList
