import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"

const BlogPost = ({ post, basePath }) => {
  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-\$)+/g, "")
    return slug
  }
  return (
    <>
      <MDXRenderer>{post.body}</MDXRenderer>
      <div>
        <p>Tagged with:</p>
        <ul>
          {post.tags.map(tag => (
            <li key={tag}>
              <Link to={`${basePath}/tag/${slugify(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BlogPost
