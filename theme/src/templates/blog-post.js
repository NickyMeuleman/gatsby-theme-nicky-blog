import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlogPost from "../components/BlogPost";

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.blogPost

  return (
    <Layout>
      {/* <SEO
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        image={
          post.cover
            ? post.cover.childImageSharp.sizes.src
            : "/icons/icon-256x256.png"
        }
      /> */}
      <BlogPost post={post} basePath={pageContext.basePath}/>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostTemplateQuery($slug: String!) {
    blogPost(slug: { eq: $slug }) {
          excerpt
          id
          slug
          body
          tags
          title
    }
  }
`

export default BlogPostTemplate
