import React from "react"
import { Link } from "gatsby";

const TagList = ({tags}) => 
(
  <ul>
    {tags.map(tag => <li key={tag.slug}>
        <Link to={`/blog/tag/${tag.slug}`}>{tag.name} ({tag.amount})</Link>
    </li>)}
  </ul>
)

export default TagList