/** @jsx jsx */
import React from "react";
import { jsx, Styled } from "theme-ui";
import * as path from "path";
import { Layout } from "./Layout";
import { PostCard } from "./PostCard";
import { SEO } from "./SEO";
import { IAuthorPageData, IAuthorPageContext } from "../types";

interface IProps {
  data: IAuthorPageData;
  pageContext: IAuthorPageContext;
}

const AuthorPage: React.FC<IProps> = ({ data, pageContext }) => {
  const { posts, author } = data;
  const { slug } = pageContext;

  return (
    <React.Fragment>
      <SEO title={`Author "${author.name}"`} slug={`author/${slug}`} />
      <Layout>
        <div sx={{ variant: `styles.AuthorPage` }}>
          <h1>{author.name}</h1>
          {author.twitter && (
            <Styled.p>
              Follow{` `}
              <Styled.a href={`https://twitter.com/${author.twitter}`}>
                @{author.twitter}
              </Styled.a>
              {` `}on Twitter.
            </Styled.p>
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
                    coverSizes={
                      post.cover ? post.cover.childImageSharp.fluid : null
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

export { AuthorPage };
