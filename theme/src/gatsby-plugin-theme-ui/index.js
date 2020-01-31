/**
 * This theme uses `theme-ui` under the hood.
 * @see https://theme-ui.com/
 * @see https://theme-ui.com/gatsby-plugin/
 */

import nightOwlLight from "@theme-ui/prism/presets/night-owl-light.json"
import merge from "deepmerge"
import { tailwind } from "@theme-ui/presets"

export default merge(tailwind, {
  colors: {
    text: `#232129`,
    background: `#fff`,
    primary: `#639`,
  },
  sizes: {
    container: 650,
  },
  styles: {
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
      h1: {
        display: `block`,
        fontSize: 3,
        margin: `0 auto`,
        maxWidth: `container`,
        padding: 3,
        width: `90vw`,
        color: `inherit`,
      },
      a: {
        color: `inherit`,
      },
    },
    Main: {
      margin: `0 auto`,
      maxWidth: `container`,
      width: `90vw`,
    },
    Container: {
      padding: 0,
      paddingBottom: 3,
      paddingTop: 3,
    },
    pre: {
      ...nightOwlLight,
      marginBottom: 2,
      overflow: `auto`,
      p: 3,
    },
  },
})
