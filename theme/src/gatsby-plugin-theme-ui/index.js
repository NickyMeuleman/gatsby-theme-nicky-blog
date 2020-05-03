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
      overflow: `auto`,
      my: 2,
      padding: 3,
      borderRadius: `medium`,
      pre: {
        backgroundColor: `transparent`,
        float: `left`,
        minWidth: `100%`,
        margin: 0,
        ".highlight-line": {
          backgroundColor: `#f0f0f0`,
          borderLeftColor: `#49d0c5`,
          borderLeftStyle: `solid`,
          borderLeftWidth: `0.3em`,
          display: `block`,
          marginRight: `-1em`,
          marginLeft: `-1em`,
          paddingRight: `1em`,
          paddingLeft: `0.75em`,
        },
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
