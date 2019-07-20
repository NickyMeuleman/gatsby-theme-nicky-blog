import React from "react"
import PostCard from "./PostCard";

const BlogList = ({ blogPosts, totalCount }) => {
  return (
    <>
      <p>
        <span role="img" aria-label="googly-eyes">
          👀
        </span>{" "}
        {totalCount} Posts total
      </p>
      {blogPosts.map((blogPost) => {
        return (
          <PostCard
            key={blogPost.id}
            url={`/blog${blogPost.slug}`}
            title={blogPost.title}
            date={blogPost.date}
            author={blogPost.author}
            coverSizes={
              blogPost.cover
                ? blogPost.cover.childImageSharp.fluid
                : null
            }
          />
        )
      })}
    </>
  )
}

export default BlogList
