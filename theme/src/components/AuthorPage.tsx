/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import * as path from "path";
import { Layout } from "./Layout";
import { PostCard } from "./PostCard";
import { SEO } from "./SEO";
import {
  IAuthorPageData,
  IAuthorPageContext,
  IAuthorTemplateQuery,
} from "../types";
import type { HeadFC } from "gatsby";

interface IProps {
  data: IAuthorPageData;
  pageContext: IAuthorPageContext;
}

const AuthorPage: React.FC<IProps> = ({ data, pageContext }) => {
  const { posts, author } = data;

  return (
    <React.Fragment>
      <Layout>
        <div sx={{ variant: `styles.AuthorPage` }}>
          <h1>{author.name}</h1>
          {author.twitter && (
            <Themed.p>
              Follow{` `}
              <Themed.a href={`https://twitter.com/${author.twitter}`}>
                @{author.twitter}
              </Themed.a>
              {` `}on Twitter.
            </Themed.p>
          )}
          <div
            sx={{
              maxWidth: `lineLength`,
              mx: `auto`,
            }}
          >
            <p
              sx={{
                textTransform: `uppercase`,
                letterSpacing: `wider`,
                fontWeight: `bold`,
                color: `mutedText`,
              }}
            >
              {data.amount} Stories by {data.author.name}
            </p>
            <ul
              sx={{
                listStyle: `none`,
                display: `grid`,
                gap: 4,
                padding: 0,
              }}
            >
              {posts.map((post) => (
                <li key={post.slug} sx={{ margin: 1 }}>
                  <PostCard
                    key={post.id}
                    url={path.join(`/`, post.instance.basePath, post.slug)}
                    title={post.title}
                    date={post.date}
                    authors={post.authors}
                    image={
                      post.cover
                        ? post.cover.childImageSharp.gatsbyImageData
                        : null
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

const AuthorHead: HeadFC<IAuthorTemplateQuery, IAuthorPageContext> = ({
  data,
  pageContext,
}) => {
  const { author } = data;
  const { slug } = pageContext;
  return <SEO title={`Author "${author.name}"`} slug={`author/${slug}`} />;
};

export { AuthorPage, AuthorHead };
