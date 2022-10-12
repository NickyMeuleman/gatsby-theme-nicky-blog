import { CodeBlock } from "../components/CodeBlock";
import { headingObj } from "../components/Headings";
import * as MdxComponents from "../components/mdx-components";

export default {
  pre: ({ children }) => <>{children}</>,
  code: CodeBlock,
  ...headingObj,
  ...MdxComponents,
};
