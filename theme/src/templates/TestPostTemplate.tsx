import React from "react";
import { graphql } from "gatsby";

function PostTemplate({
  data: { mdx },
  children,
}: {
  data: any;
  children: any;
}) {
  console.log({ children });

  return (
    <main>
      <h1>{mdx.frontmatter.title}</h1>
      {children}
    </main>
  );
}

export const pageQuery = graphql`
  query PostTemplate($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;

export default PostTemplate;
