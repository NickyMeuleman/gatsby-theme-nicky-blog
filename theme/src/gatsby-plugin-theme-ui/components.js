import React from "react";
import Prism from "@theme-ui/prism";
import Headings from "../components/Headings";
import * as MdxComponents from "../components/mdx-components";

export default {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
  ...Headings,
  ...MdxComponents,
};
