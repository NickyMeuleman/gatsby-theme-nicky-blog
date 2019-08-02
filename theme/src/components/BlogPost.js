import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Img from "gatsby-image"
import UnderPost from "./UnderPost"

const BlogPost = ({ post, basePath, context }) => {
  return (
    <>
      <h1>{post.title}</h1>
      {post.cover && <Img sizes={post.cover.childImageSharp.fluid} />}
      <MDXRenderer>{post.body}</MDXRenderer>
      <div>
        <p>Tagged with:</p>
        <ul>
          {post.tags.map(tag => (
            <li key={tag.slug}>
              <Link to={`/${basePath}/tag/${tag.slug}`}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <UnderPost prev={context.prev} next={context.next} basePath={basePath} />
    </>
  )
}

export default BlogPost
