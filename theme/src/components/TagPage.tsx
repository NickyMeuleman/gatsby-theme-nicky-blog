/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"

interface IProps {
  data: any
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
        >
          All tags
        </Link>
      </p>
      <ul>
        {posts.map((post: any) => (
          <li key={post.slug} sx={{ margin: `0.3rem` }}>
            <Link
              to={`${
                basePath === `/` || basePath === `` ? `` : `/`
              }${basePath}/${post.slug}`}
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
