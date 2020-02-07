/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { IPrevNext, IBlogPost } from "../types"

// TODO: this repeated CSS is giving me anxiety. Looks rad though
interface IProps {
  prev?: IPrevNext
  next?: IPrevNext
  basePath: string
  post: IBlogPost
}

const PostExtra: React.FC<IProps> = ({ prev, next, basePath, post }) => {
  const urlObj = post.canonicalUrl && new URL(post.canonicalUrl)

  return (
    <React.Fragment>
      <ul sx={{ listStyle: `none`, padding: 0 }}>
        {post.date && (
          <li sx={{ marginTop: 2 }}>
            <span
              sx={{
                margin: 0,
                textTransform: `uppercase`,
                letterSpacing: `wider`,
                fontWeight: `bold`,
                color: `mutedText`,
                fontSize: 1,
                display: `flex`,
                alignItems: `center`,
                "::after": {
                  content: `""`,
                  flex: 1,
                  marginLeft: 1,
                  backgroundColor: `primary`,
                  height: `2px`,
                },
              }}
            >
              On
            </span>
            <Styled.p sx={{ margin: 0, paddingLeft: 1 }}>
              <time dateTime={post.date}>
                {new Intl.DateTimeFormat(`en-US`, {
                  year: `numeric`,
                  month: `long`,
                  day: `numeric`,
                }).format(new Date(post.date))}
              </time>
            </Styled.p>
          </li>
        )}
        {post.authors && (
          <li sx={{ marginTop: 2 }}>
            <span
              id="post-authors"
              sx={{
                margin: 0,
                textTransform: `uppercase`,
                letterSpacing: `wider`,
                fontWeight: `bold`,
                color: `mutedText`,
                fontSize: 1,
                display: `flex`,
                alignItems: `center`,
                "::after": {
                  content: `""`,
                  flex: 1,
                  marginLeft: 1,
                  backgroundColor: `primary`,
                  height: `2px`,
                },
              }}
            >
              By
            </span>
            <ul
              aria-labelledby="post-authors"
              sx={{ listStyle: `none`, padding: 0, margin: 0, paddingLeft: 1 }}
            >
              {post.authors.map((author, idx) => (
                <li key={author.name} sx={{ marginTop: idx === 0 ? 0 : 1 }}>
                  <Styled.p sx={{ margin: 0 }}>{author.name}</Styled.p>
                </li>
              ))}
            </ul>
          </li>
        )}
        {urlObj && (
          <li sx={{ marginTop: 2 }}>
            <span
              sx={{
                margin: 0,
                marginTop: 1,
                textTransform: `uppercase`,
                letterSpacing: `wider`,
                fontWeight: `bold`,
                color: `mutedText`,
                fontSize: 1,
                display: `flex`,
                alignItems: `center`,
                "::after": {
                  content: `""`,
                  flex: 1,
                  marginLeft: 1,
                  backgroundColor: `primary`,
                  height: `2px`,
                },
              }}
            >
              Originally at
            </span>
            <p sx={{ margin: 0, paddingLeft: 1 }}>
              <Styled.a href={urlObj.toString()}>{urlObj.hostname}</Styled.a>
            </p>
          </li>
        )}
        {post.tags && (
          <li sx={{ marginTop: 2 }}>
            <span
              id="post-tags"
              sx={{
                margin: 0,
                textTransform: `uppercase`,
                letterSpacing: `wider`,
                fontWeight: `bold`,
                color: `mutedText`,
                fontSize: 1,
                display: `flex`,
                alignItems: `center`,
                "::after": {
                  content: `""`,
                  flex: 1,
                  marginLeft: 1,
                  backgroundColor: `primary`,
                  height: `2px`,
                },
              }}
            >
              Tagged
            </span>
            <ul
              aria-labelledby="post-tags"
              sx={{ listStyle: `none`, padding: 0, margin: 0, paddingLeft: 1 }}
            >
              {post.tags.map((tag, idx) => (
                <li key={tag.slug} sx={{ marginTop: idx === 0 ? 0 : 1 }}>
                  <Link
                    to={`${
                      basePath === `/` || basePath === `` ? `` : `/`
                    }${basePath}/tag/${tag.slug}`}
                    sx={{ variant: `styles.a` }}
                  >
                    {/* TODO: Replace with Tag component. flexbox the container */}
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        {prev && (
          <li sx={{ marginTop: 2 }}>
            <span
              sx={{
                margin: 0,
                textTransform: `uppercase`,
                letterSpacing: `wider`,
                fontWeight: `bold`,
                color: `mutedText`,
                fontSize: 1,
                display: `flex`,
                alignItems: `center`,
                "::after": {
                  content: `""`,
                  flex: 1,
                  marginLeft: 1,
                  backgroundColor: `primary`,
                  height: `2px`,
                },
              }}
            >
              Older post
            </span>
            <Styled.p sx={{ margin: 0, paddingLeft: 1 }}>
              <Link
                to={`${
                  basePath === `/` || basePath === `` ? `` : `/`
                }${basePath}/${prev.slug}`}
                sx={{ variant: `styles.a` }}
              >
                {prev.title}
              </Link>
            </Styled.p>
          </li>
        )}
        {next && (
          <li sx={{ marginTop: 2 }}>
            <span
              sx={{
                margin: 0,
                textTransform: `uppercase`,
                letterSpacing: `wider`,
                fontWeight: `bold`,
                color: `mutedText`,
                fontSize: 1,
                display: `flex`,
                alignItems: `center`,
                "::after": {
                  content: `""`,
                  flex: 1,
                  marginLeft: 1,
                  backgroundColor: `primary`,
                  height: `2px`,
                },
              }}
            >
              Newer post
            </span>
            <Styled.p sx={{ margin: 0, paddingLeft: 1 }}>
              <Link
                to={`${
                  basePath === `/` || basePath === `` ? `` : `/`
                }${basePath}/${next.slug}`}
                sx={{ variant: `styles.a` }}
              >
                {next.title}
              </Link>
            </Styled.p>
          </li>
        )}
      </ul>
    </React.Fragment>
  )
}
export default PostExtra
