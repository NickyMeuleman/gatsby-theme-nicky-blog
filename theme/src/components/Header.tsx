/** @jsx jsx */
import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { jsx, Styled, Box } from "theme-ui";

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
      <Styled.h1>
        {/* 
        // @ts-ignore */}
        <Styled.a as={Link} to="/">
          {title || siteTitle}
        </Styled.a>
      </Styled.h1>
    </Box>
  );
};

export default Header;
