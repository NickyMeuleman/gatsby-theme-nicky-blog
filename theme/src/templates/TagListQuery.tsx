import React from "react";
import { graphql } from "gatsby";
import { TagListPage } from "../components/TagListPage";
import {
  ITagListTemplateQuery,
  ITagListPageContext,
  ITagListPageData,
} from "../types";

interface IProps {
  data: ITagListTemplateQuery;
  pageContext: ITagListPageContext;
}

const TagListTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    // eslint-disable-next-line
    tags: data.allTag.group.reduce<ITagListPageData["tags"]>(
      (acc, item) =>
        acc.concat({
          name: item.nodes[0].name,
          slug: item.nodes[0].slug,
          amount: item.totalCount,
        }),
      []
    ),
  };

  return <TagListPage data={pageData} pageContext={pageContext} />;
};

export const tagListTemplateQuery = graphql`
  query tagListTemplateQuery($basePath: String!) {
    allTag(
      filter: {
        postPublished: { ne: false }
        instance: { basePath: { eq: $basePath } }
      }
    ) {
      group(field: slug, limit: 1) {
        nodes {
          name
          slug
        }
        totalCount
      }
    }
  }
`;

export default TagListTemplate;
