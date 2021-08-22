/**
 * This theme uses `theme-ui` under the hood.
 * @see https://theme-ui.com/
 * @see https://theme-ui.com/gatsby-plugin/
 */

import nightOwlLight from "@theme-ui/prism/presets/night-owl-light.json";
import merge from "deepmerge";
import { tailwind } from "@theme-ui/presets";

const theme = merge(tailwind, {
  colors: {
    text: `#232129`,
    mutedText: `#535454`,
    background: `#fff`,
    mutedBackground: `#f6f6f6`,
    primary: `#639`,
    mutedPrimary: `#8a4baf`,
  },
  sizes: {
    lineLength: `70ch`,
  },
  styles: {
    root: {
      margin: 0,
    },
    Layout: {
      backgroundColor: `background`,
      color: `text`,
      fontFamily: `sans`, // from tailwind styles
      fontSize: 1,
      lineHeight: `text`,
    },
    Header: {
      backgroundColor: `primary`,
      color: `background`,
      fontWeight: `bold`,
      margin: 0,
      borderBottom: `1px solid`,
      borderColor: `mutedPrimary`,
      h1: {
        display: `block`,
        fontSize: 3,
        margin: `0 auto`,
        maxWidth: `lineLength`,
        padding: 3,
        width: `90vw`,
        color: `inherit`,
      },
      a: {
        color: `inherit`,
        border: `none`,
        ":hover": {
          color: `inherit`,
          borderColor: `inherit`,
        },
      },
    },
    Main: {
      margin: `0 auto`,
      width: `90vw`,
    },
    CodeBlock: {
      ...nightOwlLight,
      fontFamily: `monospace`,
      fontSize: 0,
      padding: 2,
      borderRadius: `sm`,
      pre: {
        fontFamily: `monospace`,
        backgroundColor: `transparent`,
        float: `left`,
        minWidth: `100%`,
        margin: 0,
      },
      highlightLine: {
        // match padding on entire CodeBlock <div>
        // padding: 2 == padding: "0.5rem"
        backgroundColor: `#f0f0f0`,
        borderLeftColor: `#49d0c5`,
        borderLeftStyle: `solid`,
        borderLeftWidth: `0.25rem`,
        display: `block`,
        marginRight: `-0.5rem`,
        marginLeft: `-0.5rem`,
        paddingRight: `0.5rem`,
        paddingLeft: `0.25rem`,
      },
      title: {
        fontFamily: `monospace`,
        backgroundColor: nightOwlLight.backgroundColor,
        borderBottomWidth: `2px`,
        borderBottomStyle: `solid`,
        borderBottomColor: `#f0f0f0`,
        color: nightOwlLight.color,
        borderTopLeftRadius: `sm`,
        borderTopRightRadius: `sm`,
        borderBottomLeftRadius: `0`,
        borderBottomRightRadius: `0`,
        padding: 2,
        fontSize: 0,
        marginTop: 2,
      },
      lineNumber: {
        display: `inline-block`,
        // to support numbers with 3 digits, swap to table layout: https://codesandbox.io/s/prism-react-renderer-example-u6vhk?file=/src/styles.js
        width: `2ch`,
        textAlign: `right`,
        userSelect: `none`,
        opacity: 0.3,
        marginRight: 2,
      },
      copyButton: {
        userSelect: `none`,
        textTransform: `uppercase`,
        backgroundColor: `transparent`,
        border: `none`,
        color: nightOwlLight[`.comment`].color,
        fontFamily: `monospace`,
        fontSize: 1,
        paddingX: 1,
        paddingY: 1 / 2,
        transition: `all 0.3s ease-in-out`,
        borderWidth: `1px`,
        borderColor: `transparent`,
        borderStyle: `solid`,
        borderRadius: `sm`,
        ":hover": {
          borderColor: nightOwlLight.color,
          color: nightOwlLight.color,
        },
        ":disabled": { opacity: 0.5, cursor: `not-allowed` },
      },
    },
    inlineCode: {
      fontSize: `inherit`,
      fontFamily: `monospace`,
      letterSpacing: `wide`,
      backgroundColor: `mutedBackground`,
      padding: 1,
      borderRadius: `sm`,
    },
    a: {
      color: `mutedText`,
      borderBottomWidth: `2px`,
      borderBottomStyle: `solid`,
      borderBottomColor: `mutedPrimary`,
      textDecoration: `none`,
      ":hover": {
        textDecoration: `none`,
        color: `mutedPrimary`,
        borderBottomWidth: `2px`,
        borderBottomStyle: `solid`,
        borderBottomColor: `primary`,
      },
    },
    PostExtra: {
      link: {
        variant: `styles.a`,
        borderWidth: `1px`,
        active: {
          variant: `styles.a`,
          color: `mutedPrimary`,
        },
      },
    },
    TableOfContentsList: {
      link: {
        color: `mutedText`,
        textDecoration: `none`,
        ":hover": {
          variant: `styles.a`,
        },
        active: {
          variant: `styles.a`,
          color: `mutedPrimary`,
        },
      },
    },
    SeriesSelect: {
      link: {
        color: `mutedText`,
        textDecoration: `none`,
        ":hover": {
          variant: `styles.a`,
        },
        active: {
          variant: `styles.a`,
          color: `mutedPrimary`,
        },
      },
    },
    blockquote: {
      margin: 0,
      paddingLeft: 3,
      borderLeftWidth: 5,
      borderLeftColor: `mutedBackground`,
      borderLeftStyle: `solid`,
    },
  },
});

export default theme;
