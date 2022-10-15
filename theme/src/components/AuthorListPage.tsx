/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import * as path from "path";
import { Layout } from "./Layout";
import { SEO } from "./SEO";
import {
  IAuthorListPageContext,
  IAuthorListPageData,
  IAuthorListTemplateQuery,
} from "../types";
import type { HeadFC } from "gatsby";

interface IProps {
  data: IAuthorListPageData;
  pageContext: IAuthorListPageContext;
}

const AuthorListPage: React.FC<IProps> = ({ data, pageContext }) => {
  const { authors } = data;

  return (
    <React.Fragment>
      <Layout>
        <ul sx={{ variant: `styles.AuthorListPage` }}>
          {authors.map((author) => (
            <li key={author.id} sx={{ margin: 1 }}>
              <Link
                to={path.join(`/`, `author`, author.shortName)}
                sx={{ variant: `styles.a` }}
              >
                {author.name}
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </React.Fragment>
  );
};

const AuthorListHead: HeadFC<
  IAuthorListTemplateQuery,
  IAuthorListPageContext
> = ({ data }) => {
  return <SEO title={`${data.allAuthor.totalCount} Authors`} slug="author" />;
};

export { AuthorListPage, AuthorListHead };
