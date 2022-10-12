/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";

interface IProps {
  children: React.ReactNode;
  title: string;
  titleId?: string;
}

const MetaListItem: React.FC<IProps> = ({ title, titleId, children }) => (
  <li sx={{ marginTop: 4, variant: `styles.MetaListItem` }}>
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
        variant: `styles.MetaListItem.title`,
      }}
    >
      {title}
    </h3>
    {children}
  </li>
);

export { MetaListItem };
