/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { IAuthorPageData } from "../types"

interface IProps {
  data: IAuthorPageData | any
  basePath: string
}

const AuthorPage: React.FC<IProps> = ({ data, basePath }) => {
  const { posts, author } = data

  return (
    <div>
      <h1>{author.name}</h1>
      <ul>
        {posts.map((post: any) => (
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

export default AuthorPage
