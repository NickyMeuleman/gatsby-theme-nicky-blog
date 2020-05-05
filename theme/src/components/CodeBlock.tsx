/** @jsx jsx */
import React from "react";
// reference https://mdxjs.com/guides/syntax-highlighting
// based on https://github.com/system-ui/theme-ui/blob/master/packages/prism/src/index.js
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import rangeParser from "parse-numeric-range";
import { jsx, Styled } from "theme-ui";

interface IProps {
  className: string;
  title: string | undefined;
  hl: string | undefined;
  // the passed props are unknown
  [key: string]: any;
}

const aliases: { [key: string]: string } = {
  js: `javascript`,
  sh: `bash`,
};

const getShouldHighlightLine = (hl: string | undefined) => {
  if (hl) {
    const lineNumbers = rangeParser(hl);
    return (index: number) => lineNumbers.includes(index + 1);
  }
  return () => false;
};

const CodeBlock: React.FC<IProps> = ({
  children,
  className: outerClassName,
  title,
  hl,
  ...props
}) => {
  // MDX will pass the language as className
  // className also includes className(s) theme-ui injected
  const [language] = outerClassName.replace(/language-/, ``).split(` `);
  const lang = aliases[language] || language;
  if (typeof children !== `string`) {
    // MDX will pass in the code string as children
    return null;
  }
  const shouldHighlightLine = getShouldHighlightLine(hl);
  return (
    <React.Fragment>
      {title && <div sx={{ variant: `styles.CodeBlock.title` }}>{title}</div>}
      <div
        sx={{
          variant: `styles.CodeBlock`,
          borderTopLeftRadius: title ? `0` : undefined,
          borderTopRightRadius: title ? `0` : undefined,
        }}
      >
        <Highlight
          {...defaultProps}
          {...props}
          code={children.trim()}
          // supported languages: https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
          language={lang as Language}
          theme={undefined}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Styled.pre
              className={`${outerClassName} ${className}`}
              style={style}
            >
              {tokens.map((line, index) => (
                <div
                  key={index}
                  {...getLineProps({ line, key: index })}
                  sx={
                    shouldHighlightLine(index)
                      ? { variant: `styles.CodeBlock.highlightLine` }
                      : undefined
                  }
                >
                  {line.map((token, key) => (
                    <span
                      key={key}
                      {...getTokenProps({ token, key })}
                      // https://github.com/system-ui/theme-ui/pull/721
                      sx={token.empty ? { display: `inline-block` } : undefined}
                    />
                  ))}
                </div>
              ))}
            </Styled.pre>
          )}
        </Highlight>
      </div>
    </React.Fragment>
  );
};

export { CodeBlock };
