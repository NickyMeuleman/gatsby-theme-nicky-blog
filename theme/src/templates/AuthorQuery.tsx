import React from "react";
import { graphql } from "gatsby";
import { AuthorPage } from "../components/AuthorPage";
import { IAuthorTemplateQuery, IAuthorPageContext } from "../types";

interface IProps {
  data: IAuthorTemplateQuery;
  pageContext: IAuthorPageContext;
}

const AuthorTemplate: React.FC<IProps> = ({ data, pageContext }) => {
  const pageData = {
    amount: data.allBlogPost.totalCount,
    author: data.author,
    posts: data.allBlogPost.nodes,
  };

  return <AuthorPage data={pageData} pageContext={pageContext} />;
};

export const authorTemplateQuery = graphql`
  query authorTemplateQuery($shortName: String) {
    author(shortName: { eq: $shortName }) {
      name
      shortName
      twitter
    }
    allBlogPost(
      sort: { fields: [date], order: DESC }
      filter: {
        authors: { elemMatch: { shortName: { eq: $shortName } } }
        published: { ne: false }
      }
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
        instance {
          basePath
        }
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

export default AuthorTemplate;
