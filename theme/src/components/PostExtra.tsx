/** @jsx jsx */
import React from "react";
import { jsx, Styled } from "theme-ui";
import { Link } from "gatsby";
import { IPrevNext, IBlogPost } from "../types";
import MetaListItem from "./MetaListItem";
import useThemeOptions from "../hooks/useThemeOptions";

interface IProps {
  prev?: IPrevNext;
  next?: IPrevNext;
  post: IBlogPost;
  passedSx?: object;
}

const PostExtra: React.FC<IProps> = ({ prev, next, post, passedSx }) => {
  const { basePath } = useThemeOptions();
  const urlObj = post.canonicalUrl && new URL(post.canonicalUrl);

  return (
    <div sx={{ ...passedSx, variant: `styles.PostExtra` }}>
      <details
        sx={{
          border: `1px solid`,
          borderColor: `mutedPrimary`,
          padding: 3,
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
                      to={`${
                        basePath === `/` || basePath === `` ? `` : `/`
                      }${basePath}/author/${author.shortName}`}
                      sx={{ variant: `styles.a` }}
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
                <Styled.a href={urlObj.toString()} sx={{ marginLeft: 1 }}>
                  {urlObj.hostname}
                </Styled.a>
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
                      to={`${
                        basePath === `/` || basePath === `` ? `` : `/`
                      }${basePath}/tag/${tag.slug}`}
                      sx={{ variant: `styles.a` }}
                    >
                      {/* TODO: Replace with Tag component. flexbox the container */}
                      {tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </MetaListItem>
          )}
          {prev && (
            <MetaListItem title="Older post">
              <Styled.p sx={{ margin: 0, marginLeft: 1 }}>
                <Link
                  to={`${
                    basePath === `/` || basePath === `` ? `` : `/`
                  }${basePath}/${prev.slug}`}
                  sx={{ variant: `styles.a` }}
                >
                  {prev.title}
                </Link>
              </Styled.p>
            </MetaListItem>
          )}
          {next && (
            <MetaListItem title="Newer post">
              <Styled.p sx={{ margin: 0, marginLeft: 1 }}>
                <Link
                  to={`${
                    basePath === `/` || basePath === `` ? `` : `/`
                  }${basePath}/${next.slug}`}
                  sx={{ variant: `styles.a` }}
                >
                  {next.title}
                </Link>
              </Styled.p>
            </MetaListItem>
          )}
        </ul>
      </details>
    </div>
  );
};

export default PostExtra;
