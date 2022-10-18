/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import { Link } from "gatsby";
import * as path from "path";
import { IPrevNext, IBlogPost } from "../types";
import { MetaListItem } from "./MetaListItem";
import { TableOfContentsList } from "./TableOfContentsList";

interface IProps {
  prev?: IPrevNext;
  next?: IPrevNext;
  post: IBlogPost;
  passedSx?: object;
}

const PostExtra: React.FC<IProps> = ({ prev, next, post, passedSx }) => {
  const urlObj = post.canonicalUrl && new URL(post.canonicalUrl);
  return (
    <div sx={{ ...passedSx, variant: `styles.PostExtra` }}>
      <details
        sx={{
          border: `1px solid`,
          borderColor: `mutedPrimary`,
          padding: 3,
          mb: 4,
          variant: `styles.PostExtra.details`,
        }}
        open
      >
        <summary
          sx={{
            margin: 0,
            textTransform: `uppercase`,
            letterSpacing: `wider`,
            fontWeight: `bold`,
            color: `mutedText`,
            fontSize: 1,
            variant: `styles.PostExtra.title`,
          }}
        >
          Metadata
        </summary>
        <ul sx={{ listStyle: `none`, padding: 0 }}>
          {post.date && (
            <MetaListItem title="Date">
              <time dateTime={post.date} sx={{ marginLeft: 1 }}>
                {new Intl.DateTimeFormat(`en-US`, {
                  year: `numeric`,
                  month: `long`,
                  day: `numeric`,
                }).format(new Date(post.date))}
              </time>
            </MetaListItem>
          )}
          {post.updatedAt && (
            <MetaListItem title="Last update">
              <time dateTime={post.updatedAt} sx={{ marginLeft: 1 }}>
                {new Intl.DateTimeFormat(`en-US`, {
                  year: `numeric`,
                  month: `long`,
                  day: `numeric`,
                }).format(new Date(post.updatedAt))}
              </time>
            </MetaListItem>
          )}
          {post.authors && (
            <MetaListItem title="By" titleId="post-authors">
              <ul
                aria-labelledby="post-authors"
                sx={{ listStyle: `none`, padding: 0, margin: 0, marginLeft: 1 }}
              >
                {post.authors.map((author, idx) => (
                  <li key={author.name} sx={{ marginTop: idx === 0 ? 0 : 1 }}>
                    <Link
                      to={path.join(`/`, `author`, author.shortName)}
                      sx={{ variant: `styles.PostExtra.link` }}
                    >
                      {author.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </MetaListItem>
          )}
          {urlObj && (
            <MetaListItem title="Originally at">
              {urlObj && (
                <a
                  href={urlObj.toString()}
                  sx={{ marginLeft: 1, variant: `styles.PostExtra.link` }}
                >
                  {urlObj.hostname}
                </a>
              )}
            </MetaListItem>
          )}
          {post.tags && (
            <MetaListItem title="Tagged" titleId="post-tags">
              <ul
                aria-labelledby="post-tags"
                sx={{ listStyle: `none`, padding: 0, margin: 0, marginLeft: 1 }}
              >
                {post.tags.map((tag, idx) => (
                  <li key={tag.slug} sx={{ marginTop: idx === 0 ? 0 : 1 }}>
                    <Link
                      to={path.join(
                        `/`,
                        post.instance.basePath,
                        `tag`,
                        tag.slug
                      )}
                      sx={{ variant: `styles.PostExtra.link` }}
                    >
                      {/* TODO: Replace with Tag component. flexbox the container */}
                      {tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </MetaListItem>
          )}
          {post?.series?.posts.length > 1 && (
            <MetaListItem title="Part of series" titleId="series">
              <ul
                aria-labelledby="series"
                sx={{ listStyle: `none`, padding: 0, margin: 0, marginLeft: 1 }}
              >
                {post?.series?.posts.map((seriesPost, idx) => (
                  <li
                    key={seriesPost.slug}
                    sx={{ marginTop: idx === 0 ? 0 : 1 }}
                  >
                    <Link
                      to={path.join(
                        `/`,
                        seriesPost.instance.basePath,
                        seriesPost.slug
                      )}
                      sx={{
                        variant:
                          post.id === seriesPost.id
                            ? `styles.PostExtra.link.active`
                            : `styles.PostExtra.link`,
                      }}
                    >
                      {idx + 1}. {seriesPost.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </MetaListItem>
          )}
          {prev && (
            <MetaListItem title="Older post">
              <Themed.p sx={{ margin: 0, marginLeft: 1 }}>
                <Link
                  to={path.join(`/`, prev.instance.basePath, prev.slug)}
                  sx={{ variant: `styles.PostExtra.link` }}
                >
                  {prev.title}
                </Link>
              </Themed.p>
            </MetaListItem>
          )}
          {next && (
            <MetaListItem title="Newer post">
              <Themed.p sx={{ margin: 0, marginLeft: 1 }}>
                <Link
                  to={path.join(`/`, next.instance.basePath, next.slug)}
                  sx={{ variant: `styles.PostExtra.link` }}
                >
                  {next.title}
                </Link>
              </Themed.p>
            </MetaListItem>
          )}
        </ul>
      </details>
      {/* tableOfContents can be an empty object, check if it has items before rendering */}
      {post?.tableOfContents?.items && (
        <details
          sx={{
            border: `1px solid`,
            borderColor: `mutedPrimary`,
            padding: 3,
            mb: 4,
            position: [null, null, null, `sticky`],
            maxHeight: (theme) => {
              const space = (theme.space?.[5] as string) ?? "4rem";
              return `calc(100vh - (${space} * 2))`;
            },
            overflow: `auto`,
            top: 5,
            variant: `styles.PostExtra.details`,
          }}
          open
        >
          <summary
            sx={{
              margin: 0,
              textTransform: `uppercase`,
              letterSpacing: `wider`,
              fontWeight: `bold`,
              color: `mutedText`,
              fontSize: 1,
              variant: `styles.PostExtra.title`,
            }}
          >
            Table of contents
          </summary>
          <TableOfContentsList tableOfContents={post.tableOfContents} />
        </details>
      )}
    </div>
  );
};

export { PostExtra };
