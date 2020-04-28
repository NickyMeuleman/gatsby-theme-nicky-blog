// minor edits to original file: https://github.com/gatsbyjs/gatsby/blob/master/themes/gatsby-theme-blog/src/components/headings.js
// logic: https://theme-ui.com/recipes/linked-headings/
// reason for this over gatsby-remark-autolink-headers:
// https://github.com/ChristopherBiscardi/gatsby-mdx/issues/204
// and https://github.com/gatsbyjs/gatsby/pull/14520

/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";

const LinkIcon: React.FC = (props) => (
  <svg
    {...props}
    fill="none"
    height="24"
    width="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// How do I do this better?
type headerTypes = `h1` | `h2` | `h3` | `h4` | `h5` | `h6`;

const heading: (tag: headerTypes) => React.FC<{ id?: string }> = (Tag) => (
  props
) => {
  if (!props.id) return <Tag {...props} />;
  return (
    <Tag
      {...props}
      sx={{
        // also show icon when hovering over it, not only when hovering over the header text
        pointerEvents: `all`,
        position: `relative`,
        ".linkTag": {
          visibility: `hidden`,
        },
        ":hover .linkTag": {
          visibility: `visible`,
        },
      }}
    >
      <a
        href={`#${props.id}`}
        className="linkTag"
        sx={{
          position: `absolute`,
          top: 0,
          left: 0,
          transform: `translateX(-100%)`,
          paddingRight: 1,
          color: `primary`,
        }}
      >
        <LinkIcon />
      </a>
      {props.children}
    </Tag>
  );
};

export default {
  h1: heading(`h1`),
  h2: heading(`h2`),
  h3: heading(`h3`),
  h4: heading(`h4`),
  h5: heading(`h5`),
  h6: heading(`h6`),
};
