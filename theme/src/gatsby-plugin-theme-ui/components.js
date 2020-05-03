import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import Headings from "../components/Headings";
import * as MdxComponents from "../components/mdx-components";

export default {
  // exclude className being passed down to avoid duplicate class styling (double margin etc)
  pre: ({ children, className, ...rest }) => <div {...rest}>{children}</div>,
  code: CodeBlock,
  ...Headings,
  ...MdxComponents,
};
