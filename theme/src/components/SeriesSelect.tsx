/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import { IBlogPost } from "../types";

interface IProps {
  data: { name: string; currentId: string; posts: [IBlogPost] };
}

const SeriesSelect: React.FC<IProps> = ({ data }) => (
  <div
    sx={{
      borderRadius: `sm`,
      borderColor: `mutedPrimary`,
      borderStyle: `solid`,
      borderWidth: 1,
      marginTop: 4,
      marginBottom: 3,
      width: `clamp(15rem,90%,100%)`,
      mx: `auto`,
    }}
  >
    <p
      sx={{
        margin: 0,
        padding: 2,
        fontWeight: `bold`,
      }}
    >
      Series navigation for: {data.name}
    </p>
    {data.posts.map((post, idx) => (
      <div
        key={`series-select-${post.id}`}
        sx={{
          backgroundColor:
            data.currentId === post.id ? `mutedBackground` : `inherit`,
          padding: 2,
          borderStyle: `solid`,
          borderColor: `mutedPrimary`,
          borderWidth: 0,
          borderTopWidth: 1,
        }}
      >
        <Link
          to={`/${post.slug}`}
          sx={{
            variant:
              data.currentId === post.id
                ? `styles.SeriesSelect.link.active`
                : `styles.SeriesSelect.link`,
          }}
        >
          {idx + 1}. {post.title}
        </Link>
      </div>
    ))}
  </div>
);

export { SeriesSelect };
