import React from "react"
import { Link } from "gatsby"
import { IBlogPostContext } from "../types"

interface IProps extends IBlogPostContext {
  basePath: string
}

const UnderPost: React.FC<IProps> = ({ prev, next, basePath }) => (
  <div style={{ display: `flex`, justifyContent: `space-between` }}>
    {prev && (
      <Link
        to={`${basePath === `/` || basePath === `` ? `` : `/`}${basePath}/${
          prev.slug
        }`}
      >
        <span>← Older</span>
        <br />
        <span>{prev.title}</span>
      </Link>
    )}
    {next && (
      <Link
        to={`${basePath === `/` || basePath === `` ? `` : `/`}${basePath}/${
          next.slug
        }`}
      >
        <span>Newer →</span>
        <br />
        <span>{next.title}</span>
      </Link>
    )}
  </div>
)

export default UnderPost
