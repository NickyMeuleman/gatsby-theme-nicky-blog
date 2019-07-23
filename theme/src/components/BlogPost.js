import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"

const BlogPost = ({ post, basePath }) => {
  return (
    <>
      <MDXRenderer>{post.body}</MDXRenderer>
      <div>
        <p>Tagged with:</p>
        <ul>
          {post.tags.map(tag => (
            <li key={tag.slug}>
              <Link to={`${basePath}/tag/${tag.slug}`}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BlogPost
