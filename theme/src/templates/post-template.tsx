import { graphql } from "gatsby";

import PostComponent from "../components/test-post";

export default PostComponent;

// gatsby-plugin-mdx_10003 Invalid AST. happens when you try any TS things like types

export const testPostTemplateQuery = graphql`
  query testPostTemplateQuery($slug: String!) {
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
