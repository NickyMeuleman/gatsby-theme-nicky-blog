/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { IPrevNext, IBlogPost } from "../types"
import MetaListItem from "./MetaListItem"

interface IProps {
  prev?: IPrevNext
  next?: IPrevNext
  basePath: string
  post: IBlogPost
  passedSx?: object
}

const PostExtra: React.FC<IProps> = ({
  prev,
  next,
  basePath,
  post,
  passedSx,
}) => {
  const urlObj = post.canonicalUrl && new URL(post.canonicalUrl)

  return (
    <aside sx={passedSx}>
      <h2
        sx={{
          position: `relative`,
          margin: 0,
          textTransform: `uppercase`,
          letterSpacing: `wider`,
          fontWeight: `bold`,
          color: `mutedText`,
          fontSize: 1,
          my: 3,
          "::after": {
            position: `absolute`,
            content: `""`,
            height: `2px`,
            backgroundColor: `primary`,
            left: 0,
            width: `3.5ch`,
            bottom: -(1 / 4),
          },
        }}
      >
        Metadata
      </h2>
      <ul sx={{ listStyle: `none`, padding: 0 }}>
        {post.date && (
          <MetaListItem title="Date">
            <time dateTime={post.date} sx={{ paddingLeft: 1 }}>
              {new Intl.DateTimeFormat(`en-US`, {
                year: `numeric`,
                month: `long`,
                day: `numeric`,
              }).format(new Date(post.date))}
            </time>
          </MetaListItem>
        )}
        {post.authors && (
          <MetaListItem title="By" titleId="post-authors">
            <ul
              aria-labelledby="post-authors"
              sx={{ listStyle: `none`, padding: 0, margin: 0, paddingLeft: 1 }}
            >
              {post.authors.map((author, idx) => (
                <li key={author.name} sx={{ marginTop: idx === 0 ? 0 : 1 }}>
                  <Link
                    to={`${
                      basePath === `/` || basePath === `` ? `` : `/`
                    }${basePath}/author/${author.shortName}`}
                    sx={{ variant: `styles.a` }}
                  >
                    {author.name}
                  </Link>
                </li>
              ))}
            </ul>
          </MetaListItem>
        )}
        {urlObj && (
          <MetaListItem title="Originally at">
            {urlObj && (
              <Styled.a href={urlObj.toString()} sx={{ paddingLeft: 1 }}>
                {urlObj.hostname}
              </Styled.a>
            )}
          </MetaListItem>
        )}
        {post.tags && (
          <MetaListItem title="Tagged" titleId="post-tags">
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
          </MetaListItem>
        )}
        {prev && (
          <MetaListItem title="Older post">
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
          </MetaListItem>
        )}
        {next && (
          <MetaListItem title="Newer post">
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
          </MetaListItem>
        )}
      </ul>
    </aside>
  )
}

export default PostExtra
