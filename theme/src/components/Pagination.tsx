import React, { ChangeEvent } from "react"
import { navigate, Link } from "gatsby"
import * as path from "path"
import { IBlogPostListPageContext } from "../types"

interface IProps {
  context: IBlogPostListPageContext
  basePath: string
}

const Pagination: React.FC<IProps> = ({
  context: { numPages, currentPage, prefixPath = `` },
  basePath,
}) => {
  if (!numPages || !currentPage) {
    return (
      <p>No pagination context passed to the {`<Pagination />`} component</p>
    )
  }
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPageNum = currentPage - 1
  const nextPageNum = currentPage + 1
  const prevPageLink =
    !isFirst &&
    (currentPage - 1 === 1
      ? path.join(`/`, basePath)
      : path.join(`/`, basePath, prefixPath, prevPageNum.toString()))
  const nextPageLink =
    !isLast && path.join(`/`, basePath, prefixPath, nextPageNum.toString())
  const changePage = (event: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target
    const navPath =
      value === `1`
        ? path.join(`/`, basePath)
        : path.join(`/`, basePath, prefixPath, value)
    navigate(navPath)
  }
  return (
    <div>
      <div>
        {prevPageLink ? (
          <Link to={prevPageLink}>← Newer posts</Link>
        ) : (
          <span>← Newer posts</span>
        )}
        {nextPageLink ? (
          <Link to={nextPageLink}>Older posts →</Link>
        ) : (
          <span>Older posts →</span>
        )}
      </div>
      <div>
        <span>Showing page &nbsp;</span>
        <select
          onChange={changePage}
          value={currentPage.toString()}
          aria-label="Pagination Dropdown"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <option
              value={`${i + 1}`}
              key={`pagination-number${i + 1}`}
              aria-label={`Goto Page ${i + 1}`}
              aria-current={currentPage === i + 1 && `page`}
            >
              {i + 1}
            </option>
          ))}
        </select>
        <span>&nbsp; of &nbsp;</span>
        <span>{numPages}</span>
      </div>
    </div>
  )
}

export default Pagination
