import React from "react"
import PostCard from "./PostCard"
import { IBlogPostPreview } from "../types"

interface IProps {
  blogPosts: IBlogPostPreview[]
  totalCount: number
  basePath: string
}

const BlogList: React.FC<IProps> = ({ blogPosts, totalCount, basePath }) => (
  <>
    <p>
      <span role="img" aria-label="googly-eyes">
        👀
      </span>
      {totalCount} Posts total
    </p>
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
  </>
)

export default BlogList
