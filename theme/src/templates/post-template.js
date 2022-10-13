import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";

const shortcodes = { Link }; // Provide common components here

export default function PageTemplate({ data, children }) {
  console.log(children);
  return (
    <>
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </>
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
