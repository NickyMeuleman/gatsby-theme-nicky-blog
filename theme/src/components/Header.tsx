/** @jsx jsx */
import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { jsx, Themed, Box } from "theme-ui";

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = ({ title }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const siteTitle = data.site.siteMetadata.title;
  return (
    <Box
      as="header"
      sx={{
        display: `flex`,
        variant: `styles.Header`,
      }}
    >
      <Themed.h1>
        {/* 
        // @ts-ignore */}
        <Themed.a as={Link} to="/">
          {title || siteTitle}
        </Themed.a>
      </Themed.h1>
    </Box>
  );
};

export { Header };
