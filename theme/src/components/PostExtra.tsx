/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { IPrevNext, IBlogPost } from "../types"

interface IProps {
  prev?: IPrevNext
  next?: IPrevNext
  basePath: string
  post: IBlogPost
}

const PostExtra: React.FC<IProps> = ({ prev, next, basePath, post }) => (
  <aside sx={{ padding: 2 }}>
    <ul sx={{ listStyle: `none`, padding: 0 }}>
      {post.authors && (
        <li
          sx={{
            borderTopSize: `1px`,
            borderTopStyle: `solid`,
            borderTopColor: `primary`,
          }}
        >
          <Styled.h3>By</Styled.h3>
          <ul sx={{ listStyle: `none`, padding: 0 }}>
            {post.authors.map(author => (
              <li>
                <Styled.p>{author.name}</Styled.p>
              </li>
            ))}
          </ul>
        </li>
      )}
      {post.canonicalUrl && (
        <li
          sx={{
            borderTopSize: `1px`,
            borderTopStyle: `solid`,
            borderTopColor: `primary`,
          }}
        >
          <Styled.h3>Originally published at</Styled.h3>
          <Styled.a href={post.canonicalUrl}>
            <Styled.p>{post.canonicalUrl}</Styled.p>
          </Styled.a>
        </li>
      )}
      {prev && (
        <li
          sx={{
            borderTopSize: `1px`,
            borderTopStyle: `solid`,
            borderTopColor: `primary`,
          }}
        >
          <Styled.h3>Older post</Styled.h3>
          <Link
            to={`${basePath === `/` || basePath === `` ? `` : `/`}${basePath}/${
              prev.slug
            }`}
          >
            <Styled.p>{prev.title}</Styled.p>
          </Link>
        </li>
      )}
      {next && (
        <li
          sx={{
            borderTopSize: `1px`,
            borderTopStyle: `solid`,
            borderTopColor: `primary`,
          }}
        >
          <Styled.h3>Newer post</Styled.h3>
          <Link
            to={`${basePath === `/` || basePath === `` ? `` : `/`}${basePath}/${
              next.slug
            }`}
          >
            <Styled.p>{next.title}</Styled.p>
          </Link>
        </li>
      )}
      {post.tags && (
        <li
          sx={{
            borderTopSize: `1px`,
            borderTopStyle: `solid`,
            borderTopColor: `primary`,
          }}
        >
          <Styled.h3>Tagged</Styled.h3>
          <ul sx={{ listStyle: `none`, padding: 0 }}>
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
        </li>
      )}
    </ul>
  </aside>
)

export default PostExtra
