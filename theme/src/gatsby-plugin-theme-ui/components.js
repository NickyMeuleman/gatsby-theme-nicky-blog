import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import { headingObj } from "../components/Headings";
import * as MdxComponents from "../components/mdx-components";

export default {
  pre: ({ children }) => <React.Fragment>{children}</React.Fragment>,
  code: CodeBlock,
  ...headingObj,
  ...MdxComponents,
};
