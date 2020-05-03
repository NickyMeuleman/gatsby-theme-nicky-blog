/** @jsx jsx */

// reference https://mdxjs.com/guides/syntax-highlighting
// based on https://github.com/system-ui/theme-ui/blob/master/packages/prism/src/index.js

import Highlight, { defaultProps, Language } from "prism-react-renderer";
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

const CodeBlock: React.FC<IProps> = ({
  children,
  className: outerClassName,
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
  return (
    <Highlight
      {...defaultProps}
      {...props}
      code={children.trim()}
      // supported languages: https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
      language={lang as Language}
      theme={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Styled.pre className={`${outerClassName} ${className}`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span
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
  );
};

export { CodeBlock };
