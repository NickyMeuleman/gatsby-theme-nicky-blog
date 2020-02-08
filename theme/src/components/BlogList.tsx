/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import PostCard from "./PostCard"
import { IBlogPostPreview, IBlogPostListPageContext } from "../types"
import Pagination from "./Pagination"
import SEO from "./SEO"

interface IProps {
  blogPosts: IBlogPostPreview[]
  totalCount: number
  basePath: string
  paginationContext: IBlogPostListPageContext
}

const BlogList: React.FC<IProps> = ({
  blogPosts,
  totalCount,
  basePath,
  paginationContext,
}) => (
  <React.Fragment>
    <SEO basePath={basePath} />
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
          marginBottom: 3,
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
            basePath={basePath}
          />
        ))}
      </div>
      {paginationContext && (
        <Pagination context={paginationContext} basePath={basePath} />
      )}
    </div>
  </React.Fragment>
)

export default BlogList
