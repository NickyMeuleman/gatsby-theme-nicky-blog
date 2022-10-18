import React from "react";
import { graphql } from "gatsby";
import {
  AuthorListPage,
  AuthorListHead as Head,
} from "../components/AuthorListPage";
import { IAuthorListTemplateQuery, IAuthorListPageContext } from "../types";

interface IProps {
  data: IAuthorListTemplateQuery;
  pageContext: IAuthorListPageContext;
}

const AuthorListTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    authors: data.allAuthor.nodes,
    amount: data.allAuthor.totalCount,
  };

  return <AuthorListPage data={pageData} pageContext={pageContext} />;
};

export const authorListTemplateQuery = graphql`
  query authorListTemplateQuery {
    allAuthor(sort: { fields: name, order: ASC }) {
      totalCount
      nodes {
        id
        name
        shortName
        twitter
      }
    }
  }
`;

export default AuthorListTemplate;
export { Head };
