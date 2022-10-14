/** @jsx jsx */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Themed } from "@theme-ui/mdx";
import * as React from "react";
import { jsx } from "theme-ui";
import { Aside } from "../Aside";
import { CodeBlock } from "../CodeBlock";
import { headingObj } from "../Headings";

type Language =
  | "bash"
  | "sh"
  | "shell"
  | "css"
  | "javascript"
  | "js"
  | "jsx"
  | "diff"
  | "git"
  | "go"
  | "graphql"
  | "handlebars"
  | "json"
  | "less"
  | "markdown"
  | "mdx"
  | "python"
  | "py"
  | "sass"
  | "scss"
  | "tsx"
  | "typescript"
  | "ts"
  | "wasm"
  | "yaml"
  | "rust"
  | "svelte"
  | "html"
  | "text";

type GetLanguageInput = `language-${Language}` | "";

interface IPreProps {
  children: {
    props: {
      children: string;
      className?: GetLanguageInput;
      title?: string;
      hl?: string;
      numberLines?: boolean;
      [key: string]: any;
    };
  };
}

const preToCodeBlock = (preProps: IPreProps) => {
  if (preProps?.children?.props) {
    const {
      children: codeString,
      className = ``,
      ...props
    } = preProps.children.props;
    const match = className.match(/language-([\0-\uFFFF]*)/);

    return {
      codeString: codeString.trim(),
      className: className,
      language: match !== null ? match[1] : ``,
      ...props,
    };
  }

  return undefined;
};

const MdxComponents = {
  Aside: (props: any) => <Aside {...props} />,
  pre: (preProps: any) => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <CodeBlock {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />;
  },
  ...headingObj,
  code: (props: any) => {
    return <Themed.code>{props.children}</Themed.code>;
  },
};

export default MdxComponents;
