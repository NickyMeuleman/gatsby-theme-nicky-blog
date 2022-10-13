import React from "react";
import { graphql } from "gatsby";
import { BlogPostPage } from "../components/BlogPostPage";
import { IBlogPostPageContext, IBlogPostTemplateQuery } from "../types";

interface IProps {
  children: React.ReactNode;
  data: IBlogPostTemplateQuery;
  pageContext: IBlogPostPageContext;
}

const BlogPostTemplate: React.FC<IProps> = ({
  data,
  pageContext,
  children,
}) => {
  return (
    <div>
      <h1>test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h1>children:</h1>
      <pre>{JSON.stringify(children, null, 2)}</pre>
      <h2>pageContext</h2>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
    </div>
  );
};

export const blogPostTemplateQuery = graphql`
  query blogPostTemplateQuery($slug: String!) {
    blogPost(slug: { eq: $slug }) {
      id
      slug
      title
    }
  }
`;
// const BlogPostTemplate: React.FC<IProps> = ({
//   data,
//   pageContext,
//   children,
// }) => {
//   if (data.blogPost.series?.posts) {
//     data.blogPost.series.posts.sort(
//       (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//     );
//   }
//   const pageData = {
//     post: data.blogPost,
//   };

//   return (
//     <BlogPostPage
//       data={pageData}
//       pageContext={pageContext}
//       passedChildren={children}
//     />
//   );
// };

// export const blogPostTemplateQuery = graphql`
//   query blogPostTemplateQuery($slug: String!) {
//     blogPost(slug: { eq: $slug }) {
//       excerpt
//       id
//       slug
//       date
//       updatedAt
//       canonicalUrl
//       body
//       keywords
//       tableOfContents
//       series {
//         name
//         posts {
//           id
//           date
//           slug
//           title
//           instance {
//             basePath
//           }
//         }
//       }
//       tags {
//         name
//         slug
//       }
//       authors {
//         shortName
//         name
//         twitter
//       }
//       instance {
//         basePath
//       }
//       title
//       cover {
//         childImageSharp {
//           gatsbyImageData(layout: FULL_WIDTH)
//         }
//       }
//     }
//   }
// `;

export default BlogPostTemplate;
