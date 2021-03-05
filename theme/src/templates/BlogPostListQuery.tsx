import React from "react";
import { graphql } from "gatsby";
import { BlogPostListPage } from "../components/BlogPostListPage";
import {
  IBlogPostListTemplateQuery,
  IBlogPostListPageContext,
  IBlogPostListPageContextWithPagination,
} from "../types";
import { useThemeOptions } from "../hooks/useThemeOptions";

interface IProps {
  data: IBlogPostListTemplateQuery;
  pageContext:
    | IBlogPostListPageContext
    | IBlogPostListPageContextWithPagination;
}

const BlogPostListTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const { instances } = useThemeOptions();
  const { basePath } = pageContext;

  const instance = instances.find((item) => item.basePath === basePath);

  const pageData = {
    blogPosts: data.allBlogPost.nodes,
    amount: data.allBlogPost.totalCount,
    paginationContext:
      instance && instance.pagination
        ? (pageContext as IBlogPostListPageContextWithPagination)
        : undefined,
  };

  return <BlogPostListPage data={pageData} pageContext={pageContext} />;
};

export const blogPostListTemplateQuery = graphql`query blogPostListTemplateQuery($skip: Int, $limit: Int, $basePath: String) {
  allBlogPost(
    sort: {fields: [date], order: DESC}
    limit: $limit
    skip: $skip
    filter: {published: {ne: false}, instance: {basePath: {eq: $basePath}}}
  ) {
    totalCount
    nodes {
      id
      authors {
        shortName
        name
      }
      instance {
        basePath
      }
      title
      slug
      date
      cover {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  }
}
`;

export default BlogPostListTemplate;
