import React from "react"
import { Link } from "gatsby"
import { ITagSummary } from "../types"

interface IProps {
  tags: ITagSummary[]
  basePath: string
}

const TagList: React.FC<IProps> = ({ tags, basePath }) => (
  <ul>
    {tags.map(tag => (
      <li key={tag.slug} css={{ margin: `0.3rem` }}>
        <Link
          to={`${
            basePath === `/` || basePath === `` ? `` : `/`
          }${basePath}/tag/${tag.slug}`}
        >
          {tag.name} ({tag.amount})
        </Link>
      </li>
    ))}
  </ul>
)

export default TagList
