import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlogPost from "../components/BlogPost"
import SEO from "../components/SEO"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.blogPost

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        basePath={pageContext.basePath}
        keywords={post.keywords || []}
        image={
          post.cover
            ? post.cover.childImageSharp.fluid.src
            : `/path/to/fallback/image.png`
        }
        canonicalUrl={post.canonicalUrl}
        twitterHandle={
          post.authors && post.authors[0].twitter
            ? post.authors[0].twitter
            : null
        }
      />
      <BlogPost
        post={post}
        context={pageContext}
        basePath={pageContext.basePath}
      />
    </Layout>
  )
}

export const query = graphql`
  query BlogPostTemplateQuery($slug: String!) {
    blogPost(slug: { eq: $slug }) {
      excerpt
      id
      slug
      canonicalUrl
      body
      tags {
        name
        slug
      }
      authors {
        name
        twitter
      }
      title
      cover {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`

export default BlogPostTemplate
