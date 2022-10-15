/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import * as path from "path";
import { Layout } from "./Layout";
import { SEO } from "./SEO";
import {
  ITagListPageData,
  ITagListPageContext,
  ITagListTemplateQuery,
} from "../types";
import type { HeadFC } from "gatsby";

interface IProps {
  data: ITagListPageData;
  pageContext: ITagListPageContext;
}

const TagListPage: React.FC<IProps> = ({ data, pageContext }) => {
  const { tags } = data;
  const { basePath } = pageContext;

  return (
    <React.Fragment>
      <Layout>
        <ul sx={{ variant: `styles.TagListPage` }}>
          {tags.map((tag) => (
            <li key={tag.slug} sx={{ margin: 1 }}>
              <Link
                to={path.join(`/`, basePath, `tag`, tag.slug)}
                sx={{ variant: `styles.a` }}
              >
                {tag.name} ({tag.amount})
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </React.Fragment>
  );
};

const TagListHead: HeadFC<ITagListTemplateQuery, ITagListPageContext> = ({
  pageContext,
}) => {
  const { basePath } = pageContext;

  return (
    <SEO
      title="Tags"
      description="List of post tags"
      slug="tag"
      basePath={basePath}
    />
  );
};

export { TagListPage, TagListHead };
