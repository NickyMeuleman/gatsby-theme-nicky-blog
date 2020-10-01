/** @jsx jsx */
import React from "react";
import { jsx, Styled } from "theme-ui";
// @ts-ignore
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";
import { Layout } from "./Layout";
import { PostExtra } from "./PostExtra";
import { SEO } from "./SEO";
import { IBlogPostPageContext, IBlogPostPageData } from "../types";
import { SeriesSelect } from "./SeriesSelect";

interface IProps {
  data: IBlogPostPageData;
  pageContext: IBlogPostPageContext;
}

const BlogPostPage: React.FC<IProps> = ({ data, pageContext }) => {
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
        // TODO: gatsby-plugin-printer for image
        image={
          post.cover
            ? post.cover.childImageSharp.fluid.src
            : `/path/to/fallback/image.png`
        }
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
            gridTemplateColumns: [
              `1fr minmax(0, 70ch) 1fr`,
              null,
              null,
              (t) =>
                `1fr minmax(0, 30ch) minmax(0, ${t.space[5]}) 70ch ${t.space[5]} 30ch 1fr`,
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
            <Styled.h1 sx={{ mt: 0, mb: 4 }}>{post.title}</Styled.h1>
            {post.cover && (
              <Img fluid={post.cover.childImageSharp.fluid} sx={{ mb: 4 }} />
            )}
            <MDXRenderer>{post.body}</MDXRenderer>
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
