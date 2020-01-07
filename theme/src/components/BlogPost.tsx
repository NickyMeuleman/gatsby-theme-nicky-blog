/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
// @ts-ignore
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Img from "gatsby-image"
import UnderPost from "./UnderPost"
import { IBlogPostPageContext, IBlogPost } from "../types"
import SEO from "./SEO"

interface IProps {
  post: IBlogPost
  basePath: string
  context: IBlogPostPageContext
}

const BlogPost: React.FC<IProps> = ({ post, basePath, context }) => (
  <React.Fragment>
    <SEO
      title={post.title}
      description={post.excerpt}
      slug={post.slug}
      basePath={basePath}
      keywords={post.keywords || []}
      // TODO: gatsby-plugin-printer for image
      image={
        post.cover
          ? post.cover.childImageSharp.fluid.src
          : `/path/to/fallback/image.png`
      }
      canonicalUrl={post.canonicalUrl}
      twitterHandle={
        post.authors && post.authors[0].twitter
          ? post.authors[0].twitter
          : undefined
      }
    />
    <h1>{post.title}</h1>
    {post.cover && <Img sizes={post.cover.childImageSharp.fluid} />}
    {post.canonicalUrl ? (
      <p sx={{ color: `rgba(0,0,0,0.7)`, lineHeight: 2 }}>
        <em>
          Originally published at
          <a href={post.canonicalUrl}>{post.canonicalUrl}</a>
        </em>
      </p>
    ) : null}

    <MDXRenderer>{post.body}</MDXRenderer>
    {post.tags && (
      <div>
        <p>Tagged with:</p>
        <ul>
          {post.tags.map(tag => (
            <li key={tag.slug} sx={{ margin: `0.3rem` }}>
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
  </React.Fragment>
)

export default BlogPost
