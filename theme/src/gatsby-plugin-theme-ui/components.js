import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import Headings from "../components/Headings";
import * as MdxComponents from "../components/mdx-components";

export default {
  pre: ({ children }) => <>{children}</>,
  code: CodeBlock,
  ...Headings,
  ...MdxComponents,
};
