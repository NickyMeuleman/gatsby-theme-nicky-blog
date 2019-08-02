import React from "react"
import { Link } from "gatsby"

const TagPage = ({ data, basePath }) => {
  const { posts } = data
  const tagHeader = `${data.amount} post${
    data.amount === 1 ? `` : `s`
  } tagged with "${data.name}"`

  return (
    <>
      <h1>{tagHeader}</h1>
      <p>
        <Link to={`/${basePath}/tag`}>All tags</Link>
      </p>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={`/${basePath}/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TagPage
