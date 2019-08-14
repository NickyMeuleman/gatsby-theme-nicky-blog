import React from "react"
import Prism from "@theme-ui/prism"
import Headings from "../components/Headings"

export default {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
  ...Headings,
}
