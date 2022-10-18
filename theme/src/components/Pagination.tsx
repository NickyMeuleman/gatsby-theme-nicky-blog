/** @jsx jsx */
import React, { ChangeEvent } from "react";
import { jsx } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { navigate, Link } from "gatsby";
import * as path from "path";
import { IBlogPostListPageContextWithPagination } from "../types";

interface IProps {
  context: IBlogPostListPageContextWithPagination;
}

const Pagination: React.FC<IProps> = ({
  context: { numPages, currentPage, basePath, prefixPath },
}) => {
  if (!numPages || !currentPage) {
    return (
      <Themed.p>
        No pagination context passed to the {`<Pagination />`} component
      </Themed.p>
    );
  }
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPageNum = currentPage - 1;
  const nextPageNum = currentPage + 1;
  const prevPageLink =
    !isFirst &&
    (currentPage - 1 === 1
      ? path.join(`/`, basePath)
      : path.join(`/`, basePath, prefixPath, prevPageNum.toString()));
  const nextPageLink =
    !isLast && path.join(`/`, basePath, prefixPath, nextPageNum.toString());
  const changePage = (event: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    const navPath =
      value === `1`
        ? path.join(`/`, basePath)
        : path.join(`/`, basePath, prefixPath, value);
    navigate(navPath).catch((cause) =>
      console.error("Failed to navigate:", cause)
    );
  };
  return (
    <nav
      sx={{
        display: `flex`,
        justifyContent: `space-between`,
        flexDirection: [`column`, `row`],
        px: 4,
        my: 4,
        variant: `styles.Pagination`,
      }}
    >
      <div
        sx={{
          display: `flex`,
          margin: `0`,
          padding: `0`,
          justifyContent: `space-between`,
          alignItems: `center`,
          width: [null, 64],
        }}
      >
        {prevPageLink ? (
          <Link to={prevPageLink} sx={{ variant: `styles.a` }}>
            ← Newer posts
          </Link>
        ) : (
          <span>← Newer posts</span>
        )}
        {nextPageLink ? (
          <Link to={nextPageLink} sx={{ variant: `styles.a` }}>
            Older posts →
          </Link>
        ) : (
          <span>Older posts →</span>
        )}
      </div>
      <div
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `flex-end`,
          my: 3,
        }}
      >
        <span>Showing page &nbsp;</span>
        <select
          onChange={changePage}
          value={currentPage.toString()}
          aria-label="Pagination Dropdown"
          sx={{ color: `primary`, fontWeight: `bold` }}
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
    </nav>
  );
};

export { Pagination };
