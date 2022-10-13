/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { getSrc, GatsbyImage } from "gatsby-plugin-image";
import { Layout } from "./Layout";
import { PostExtra } from "./PostExtra";
import { SEO } from "./SEO";
import { IBlogPostPageContext, IBlogPostPageData } from "../types";
import { SeriesSelect } from "./SeriesSelect";

interface IProps {
  children: React.ReactNode;
  data: IBlogPostPageData;
  pageContext: IBlogPostPageContext;
}

const BlogPostPage: React.FC<IProps> = ({ data, pageContext, children }) => {
  const { post } = data;
  const { prev, next } = pageContext;

  return (
    <React.Fragment>
      <SEO
        author={post.authors && post.authors[0] ? post.authors[0] : undefined}
        date={post.date}
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        keywords={post.keywords || []}
        image={post.cover ? getSrc(post.cover) : `/path/to/fallback/image.png`}
        canonicalUrl={post.canonicalUrl}
        twitterHandle={
          post.authors && post.authors[0].twitter
            ? post.authors[0].twitter
            : undefined
        }
        basePath={post.instance.basePath}
      />
      <Layout>
        <div
          sx={{
            display: `grid`,
            gridAutoFlow: `dense`,
            gridTemplateColumns: (t) => [
              `1fr minmax(0, 70ch) 1fr`,
              null,
              null,
              `1fr minmax(0, 30ch) minmax(0, ${t.space?.[5] ?? "4rem"}) 70ch ${
                t.space?.[5] ?? "4rem"
              } 30ch 1fr`,
            ],
            my: 5,
            variant: `styles.BlogPostPage`,
          }}
        >
          <PostExtra
            prev={prev}
            next={next}
            post={post}
            passedSx={{ gridColumn: [`2/3`, null, null, `6/7`] }}
          />
          <article sx={{ gridColumn: [`2/3`, null, null, `4/5`] }}>
            <Themed.h1 sx={{ mt: 0, mb: 4 }}>{post.title}</Themed.h1>
            {post.cover && (
              <GatsbyImage
                alt={post.title}
                image={post.cover.childImageSharp.gatsbyImageData}
                sx={{ mb: 4 }}
              />
            )}
            {children}
            {post?.series?.posts.length > 1 && (
              <SeriesSelect
                data={{
                  name: post.series.name,
                  currentId: post.id,
                  posts: post.series.posts,
                }}
              />
            )}
          </article>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export { BlogPostPage };
