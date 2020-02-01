/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
// @ts-ignore
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
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
    <Styled.h1>{post.title}</Styled.h1>
    {post.cover && <Img sizes={post.cover.childImageSharp.fluid} />}
    {post.canonicalUrl ? (
      <Styled.p sx={{ color: `rgba(0,0,0,0.7)`, lineHeight: 2 }}>
        <Styled.em>
          Originally published at
          <Styled.a href={post.canonicalUrl}>{post.canonicalUrl}</Styled.a>
        </Styled.em>
      </Styled.p>
    ) : null}

    <MDXRenderer>{post.body}</MDXRenderer>
    {post.tags && (
      <div>
        <Styled.p>Tagged with:</Styled.p>
        <Styled.ul>
          {post.tags.map(tag => (
            <Styled.li key={tag.slug} sx={{ margin: `0.3rem` }}>
              <Link
                to={`${
                  basePath === `/` || basePath === `` ? `` : `/`
                }${basePath}/tag/${tag.slug}`}
              >
                {tag.name}
              </Link>
            </Styled.li>
          ))}
        </Styled.ul>
      </div>
    )}
    <PostExtra prev={context.prev} next={context.next} basePath={basePath} />
  </React.Fragment>
)

export default BlogPost
