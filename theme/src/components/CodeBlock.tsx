/** @jsx jsx */

// reference https://mdxjs.com/guides/syntax-highlighting
// based on https://github.com/system-ui/theme-ui/blob/master/packages/prism/src/index.js

import Highlight, { defaultProps, Language } from "prism-react-renderer";
import rangeParser from "parse-numeric-range";
import { jsx, Styled } from "theme-ui";

interface IProps {
  className: string;
  // the passed props are unknown
  [key: string]: any;
}

const aliases: { [key: string]: string } = {
  js: `javascript`,
  sh: `bash`,
};

// TODO: rewrite function
/* eslint-disable */
const calculateLinesToHighlight = (meta: string) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    // @ts-ignore
    const strlineNumbers = RE.exec(meta)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (index: number) => lineNumbers.includes(index + 1);
  }
  return () => false;
};
/* eslint-enable */

const CodeBlock: React.FC<IProps> = ({
  children,
  className: outerClassName,
  metastring,
  ...props
}) => {
  // MDX will pass the language as className
  // className also includes className(s) theme-ui injected
  const [language] = outerClassName.replace(/language-/, ``).split(` `);
  const lang = aliases[language] || language;
  if (typeof children !== `string`) {
    //   MDX will pass in the code string as children
    return null;
  }
  const shouldHighlightLine = calculateLinesToHighlight(metastring);
  return (
    <div sx={{ variant: `styles.CodeBlock` }}>
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
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              if (shouldHighlightLine(i)) {
                lineProps.className = `${lineProps.className} highlight-line`;
              }
              return (
                <div {...lineProps}>
                  {line.map((token, key) => (
                    <span
                      {...getTokenProps({ token, key })}
                      // https://github.com/system-ui/theme-ui/pull/721
                      sx={token.empty ? { display: `inline-block` } : undefined}
                    />
                  ))}
                </div>
              );
            })}
          </Styled.pre>
        )}
      </Highlight>
    </div>
  );
};

export { CodeBlock };
