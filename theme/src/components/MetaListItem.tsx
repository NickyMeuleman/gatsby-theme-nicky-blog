/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

interface IProps {
  title: string
  titleId?: string
}

const MetaListIitem: React.FC<IProps> = ({ title, titleId, children }) => (
  <li sx={{ marginTop: 2 }}>
    <h3
      id={titleId}
      sx={{
        margin: 0,
        textTransform: `uppercase`,
        letterSpacing: `wider`,
        fontWeight: `bold`,
        color: `mutedText`,
        fontSize: 0,
        display: `flex`,
        alignItems: `center`,
        "::after": {
          content: `""`,
          flex: 1,
          marginLeft: 1,
          backgroundColor: `primary`,
          height: `2px`,
        },
      }}
    >
      {title}
    </h3>
    {children}
  </li>
)

export default MetaListIitem
