import React from "react"
import { Link } from "gatsby"

const TagPage = ({ data }) => {
  const { edges: blogPosts, totalCount } = data.allBlogPost
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? `` : `s`
  } tagged with "${data.name}"`
  
  return (
    <>
      <h1>{tagHeader}</h1>
      <p>
        <Link to="/blog/tag">All tags</Link>
      </p>
      <ul>
        {blogPosts.map(({node: blogPost}) => console.log(blogPost)||
        (
          <li key={blogPost.slug}>
            <Link to={`/blog${blogPost.slug}`}>{blogPost.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}


export default TagPage
