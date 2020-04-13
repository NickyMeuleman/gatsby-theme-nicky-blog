import React from "react";
import { graphql } from "gatsby";
import BlogPostListPage from "../components/BlogPostListPage";
import {
  IBlogPostListTemplateQuery,
  IBlogPostListPageContext,
  IBlogPostListPageContextWithPagination,
} from "../types";
import useThemeOptions from "../hooks/useThemeOptions";

interface IProps {
  data: IBlogPostListTemplateQuery;
  pageContext:
    | IBlogPostListPageContext
    | IBlogPostListPageContextWithPagination;
}

const BlogPostListTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const { pagination } = useThemeOptions();
  const pageData = {
    blogPosts: data.allBlogPost.nodes,
    amount: data.allBlogPost.totalCount,
    paginationContext: pagination
      ? (pageContext as IBlogPostListPageContextWithPagination)
      : undefined,
  };

  return <BlogPostListPage data={pageData} pageContext={pageContext} />;
};

export const blogPostListTemplateQuery = graphql`
  query blogPostListTemplateQuery($skip: Int, $limit: Int) {
    allBlogPost(
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { published: { ne: false } }
    ) {
      totalCount
      nodes {
        id
        authors {
          shortName
          name
        }
        title
        slug
        date
        cover {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default BlogPostListTemplate;
