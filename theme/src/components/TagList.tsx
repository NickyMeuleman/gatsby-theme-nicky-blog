/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { ITagSummary } from "../types"

interface IProps {
  tags: ITagSummary[]
  basePath: string
}

const TagList: React.FC<IProps> = ({ tags, basePath }) => (
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
)

export default TagList
