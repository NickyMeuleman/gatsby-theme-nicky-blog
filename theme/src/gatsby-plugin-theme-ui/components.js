import React from "react";
// import { CodeBlock } from "../components/CodeBlock";
import { headingObj } from "../components/Headings";
import * as MdxComponents from "../components/mdx-components";

// Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>.
// I have no idea where it's coming from though
// CodeBlock not working well, loses all options after the language like "hl", "title", "numberLines"
// https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/src/components/mdx-components.tsx
export default {
  pre: (preProps) => {
    console.log({ preProps });
    return <>PREEEEEEEEEEEEEE</>;
  },
  code: (codeProps) => {
    console.log({ codeProps });
    return <>COOOOOOOODE</>;
  },
  ...headingObj,
  ...MdxComponents,
};
