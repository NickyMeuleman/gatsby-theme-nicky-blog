/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

interface IProps {
  title: string
  titleId?: string
  passedSx?: object
}

const MetaListIitem: React.FC<IProps> = ({
  title,
  titleId,
  children,
  passedSx,
}) => (
  <li sx={{ marginTop: 4 }}>
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
        ...passedSx,
      }}
    >
      {title}
    </h3>
    {children}
  </li>
)

export default MetaListIitem
