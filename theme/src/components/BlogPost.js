import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const BlogPost = ({ post }) => {
  return (
    <>
      <MDXRenderer>{post.body}</MDXRenderer>
    </>
  )
}

export default BlogPost
