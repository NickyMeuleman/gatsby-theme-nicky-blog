import React from "react"
import { Link } from "gatsby"

const TagPage = ({ data, basePath }) => {
  const { edges: blogPosts } = data.allBlogPost
  const tagHeader = `${data.tag.amount} post${
    data.tag.amount === 1 ? `` : `s`
  } tagged with "${data.tag.name}"`
  
  return (
    <>
      <h1>{tagHeader}</h1>
      <p>
        <Link to={`${basePath}/tag`}>All tags</Link>
      </p>
      <ul>
        {blogPosts.map(({node: blogPost}) => 
        (
          <li key={blogPost.slug}>
            <Link to={`${basePath}${blogPost.slug}`}>{blogPost.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}


export default TagPage
