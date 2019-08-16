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
      {post.canonicalUrl ? (
        <p css={{ color: `rgba(0,0,0,0.7)`, lineHeight: 2 }}>
          <em>
            Originally published at{` `}
            <a href={post.canonicalUrl}>{post.canonicalUrl}</a>
          </em>
        </p>
      ) : null}
      {` `}
      <MDXRenderer>{post.body}</MDXRenderer>
      {post.tags && (
        <div>
          <p>Tagged with:</p>
          <ul>
            {post.tags.map(tag => (
              <li key={tag.slug} css={{ margin: `0.3rem` }}>
                <Link
                  to={`${
                    basePath === `/` || basePath === `` ? `` : `/`
                  }${basePath}/tag/${tag.slug}`}
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <UnderPost prev={context.prev} next={context.next} basePath={basePath} />
    </>
  )
}

export default BlogPost
