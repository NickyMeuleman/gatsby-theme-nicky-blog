// import React from "react";
import { graphql } from "gatsby";
// import { MDXProvider } from "@mdx-js/react";
// import { Link } from "gatsby";

import PostComponent from "../components/test-post";

export default PostComponent;

// gatsby-plugin-mdx_10003 Invalid AST. happens when you try any TS things like types
// const shortcodes = { Link }; // Provide common components here

// const PageTemplate: React.FC<{
//   data: any;
//   children: any;
// }> = ({ data, children }) => {
//   console.log(children);
//   return (
//     <>
//       <h1>{data.mdx.frontmatter.title}</h1>
//       <MDXProvider components={shortcodes}>{children}</MDXProvider>
//     </>
//   );
// };

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;

// export default PageTemplate;
