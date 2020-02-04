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
            <Styled.p
              as="h3"
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
            </Styled.p>
            <time dateTime={post.date}>
              <Styled.p sx={{ margin: 0 }}>
                {new Intl.DateTimeFormat(`en-US`, {
                  year: `numeric`,
                  month: `long`,
                  day: `numeric`,
                }).format(new Date(post.date))}
              </Styled.p>
            </time>
          </li>
        )}
        {post.authors && (
          <li sx={{ marginTop: 2 }}>
            <Styled.p
              as="h3"
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
            </Styled.p>
            <ul sx={{ listStyle: `none`, padding: 0, margin: 0 }}>
              {post.authors.map(author => (
                <li sx={{ margin: 1 }}>
                  <Styled.p sx={{ margin: 0 }}>{author.name}</Styled.p>
                </li>
              ))}
            </ul>
          </li>
        )}
        {urlObj && (
          <li sx={{ marginTop: 2 }}>
            <Styled.p
              as="h3"
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
            </Styled.p>
            <Styled.a href={urlObj.toString()}>
              <Styled.p sx={{ margin: 0 }}>{urlObj.hostname}</Styled.p>
            </Styled.a>
          </li>
        )}
        {post.tags && (
          <li sx={{ marginTop: 2 }}>
            <Styled.p
              as="h3"
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
            </Styled.p>
            <ul sx={{ listStyle: `none`, padding: 0, margin: 0 }}>
              {post.tags.map(tag => (
                <li key={tag.slug} sx={{ margin: 1 }}>
                  <Link
                    to={`${
                      basePath === `/` || basePath === `` ? `` : `/`
                    }${basePath}/tag/${tag.slug}`}
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
            <Styled.p
              as="h3"
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
            </Styled.p>
            <Link
              to={`${
                basePath === `/` || basePath === `` ? `` : `/`
              }${basePath}/${prev.slug}`}
            >
              <Styled.p sx={{ margin: 0 }}>{prev.title}</Styled.p>
            </Link>
          </li>
        )}
        {next && (
          <li sx={{ marginTop: 2 }}>
            <Styled.p
              as="h3"
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
            </Styled.p>
            <Link
              to={`${
                basePath === `/` || basePath === `` ? `` : `/`
              }${basePath}/${next.slug}`}
            >
              <Styled.p sx={{ margin: 0 }}>{next.title}</Styled.p>
            </Link>
          </li>
        )}
      </ul>
    </React.Fragment>
  )
}
export default PostExtra
