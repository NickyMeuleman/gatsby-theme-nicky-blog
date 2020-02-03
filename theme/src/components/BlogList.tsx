/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import PostCard from "./PostCard"
import { IBlogPostPreview } from "../types"

interface IProps {
  blogPosts: IBlogPostPreview[]
  totalCount: number
  basePath: string
}

const BlogList: React.FC<IProps> = ({ blogPosts, totalCount, basePath }) => (
  <div sx={{ mx: `auto`, maxWidth: `lineLength` }}>
    <p
      sx={{
        textTransform: `uppercase`,
        letterSpacing: `wider`,
        fontWeight: `bold`,
        color: `mutedText`,
      }}
    >
      <span role="img" aria-label="googly-eyes">
        👀
      </span>
      {totalCount} Posts total
    </p>
    <div
      sx={{
        display: `grid`,
        gridTemplateColumns: `1fr`,
        gridGap: 4,
      }}
    >
      {blogPosts.map(blogPost => (
        <PostCard
          key={blogPost.id}
          url={`${basePath}/${blogPost.slug}`}
          title={blogPost.title}
          date={blogPost.date}
          authors={blogPost.authors}
          coverSizes={
            blogPost.cover ? blogPost.cover.childImageSharp.fluid : null
          }
        />
      ))}
    </div>
  </div>
)

export default BlogList
