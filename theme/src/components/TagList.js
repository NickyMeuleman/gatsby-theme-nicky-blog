import React from "react"
import { Link } from "gatsby";

const TagList = ({tags, basePath}) =>
(
  <ul>
    {tags.map(tag => <li key={tag.slug}>
        <Link to={`${basePath}/tag/${tag.slug}`}>{tag.name} ({tag.amount})</Link>
    </li>)}
  </ul>
)

export default TagList