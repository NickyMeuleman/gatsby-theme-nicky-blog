/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
// @ts-ignore
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import PostExtra from "./PostExtra"
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
    <div>
      <article>
        <Styled.h1>{post.title}</Styled.h1>
        {post.cover && <Img sizes={post.cover.childImageSharp.fluid} />}
        <MDXRenderer>{post.body}</MDXRenderer>
      </article>
      <PostExtra
        prev={context.prev}
        next={context.next}
        basePath={basePath}
        post={post}
      />
    </div>
  </React.Fragment>
)
export default BlogPost
