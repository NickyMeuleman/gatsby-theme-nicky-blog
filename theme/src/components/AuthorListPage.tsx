/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import Layout from "./Layout";
import SEO from "./SEO";
import { IAuthorListPageContext, IAuthorListPageData } from "../types";

interface IProps {
  data: IAuthorListPageData;
  pageContext: IAuthorListPageContext;
}

const AuthorListPage: React.FC<IProps> = ({ data, pageContext }) => {
  const { authors } = data;

  return (
    <React.Fragment>
      <SEO title={`${data.amount} Authors`} slug="author" />
      <Layout>
        <ul sx={{ variant: `styles.AuthorListPage` }}>
          {authors.map((author) => (
            <li key={author.id} sx={{ margin: 1 }}>
              <Link
                to={`/author/${author.shortName}`}
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

export default AuthorListPage;
