/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { ITagPageData } from "../types"

interface IProps {
  data: ITagPageData
  basePath: string
}

const TagPage: React.FC<IProps> = ({ data, basePath }) => {
  const { posts } = data
  const tagHeader = `${data.amount} post${
    data.amount === 1 ? `` : `s`
  } tagged with "${data.name}"`

  return (
    <div>
      <h1>{tagHeader}</h1>
      <p>
        <Link
          to={`${
            basePath === `/` || basePath === `` ? `` : `/`
          }${basePath}/tag`}
          sx={{
            variant: `styles.a`,
          }}
        >
          All tags
        </Link>
      </p>
      <ul>
        {posts.map(post => (
          <li key={post.slug} sx={{ margin: 1 }}>
            <Link
              to={`${
                basePath === `/` || basePath === `` ? `` : `/`
              }${basePath}/${post.slug}`}
              sx={{
                variant: `styles.a`,
              }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TagPage
