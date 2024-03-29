// need to import unused React eventhough you don't need to do that anymore in react v17+
// 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { graphql } from "gatsby";
import { BlogPostPage, BlogPostHead as Head } from "../components/BlogPostPage";
// import { IBlogPostPageContext, IBlogPostTemplateQuery } from "../types";

// Gatsby throws a fit if an interface is found here (invalid AST, keyword 'interface' is reserved) while it is fine in all other templates, why?
// also when ANY TypeScript syntax is found. Maybe it thinks this is a js file?
// @ts-ignore
// interface IProps {
//   children: React.ReactNode;
//   data: IBlogPostTemplateQuery;
//   pageContext: IBlogPostPageContext;
// }

const BlogPostTemplate = ({ data, pageContext, children }) => {
  if (data.blogPost.series?.posts) {
    data.blogPost.series.posts.sort(
      // @ts-ignore
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
  const pageData = {
    post: data.blogPost,
  };

  return (
    <BlogPostPage data={pageData} pageContext={pageContext}>
      {children}
    </BlogPostPage>
  );
};

export const blogPostTemplateQuery = graphql`
  query blogPostTemplateQuery($slug: String!) {
    blogPost(slug: { eq: $slug }) {
      excerpt
      id
      slug
      date
      updatedAt
      canonicalUrl
      keywords
      tableOfContents
      series {
        name
        posts {
          id
          date
          slug
          title
          instance {
            basePath
          }
        }
      }
      tags {
        name
        slug
      }
      authors {
        shortName
        name
        twitter
      }
      instance {
        basePath
      }
      title
      cover {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  }
`;

export default BlogPostTemplate;
export { Head };
