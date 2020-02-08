// minor edits to original file: https://github.com/gatsbyjs/gatsby/blob/master/themes/gatsby-theme-blog/src/components/headings.js
// logic: https://theme-ui.com/recipes/linked-headings/
// reason for this over gatsby-remark-autolink-headers:
// https://github.com/ChristopherBiscardi/gatsby-mdx/issues/204
// and https://github.com/gatsbyjs/gatsby/pull/14520

/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

// from https://octicons.github.com/icon/link/
const LinkIcon: React.FC = props => (
  <svg
    {...props}
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="currentcolor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
    />
  </svg>
)

// How do I do this better?
type headerTypes = `h1` | `h2` | `h3` | `h4` | `h5` | `h6`

const heading: (
  tag: headerTypes
) => React.FC<{ id?: string }> = Tag => props => {
  if (!props.id) return <Tag {...props} />
  return (
    <Tag
      {...props}
      sx={{
        // also show icon when hovering over it, not only the header text
        pointerEvents: `all`,
        a: {
          visibility: `hidden`,
        },
        ":hover a": {
          visibility: `visible`,
        },
      }}
    >
      <a
        href={`#${props.id}`}
        sx={{
          marginLeft: `-20px`,
          paddingRight: `4px`,
          color: `primary`,
        }}
      >
        <LinkIcon />
      </a>
      {props.children}
    </Tag>
  )
}

export default {
  h1: heading(`h1`),
  h2: heading(`h2`),
  h3: heading(`h3`),
  h4: heading(`h4`),
  h5: heading(`h5`),
  h6: heading(`h6`),
}
