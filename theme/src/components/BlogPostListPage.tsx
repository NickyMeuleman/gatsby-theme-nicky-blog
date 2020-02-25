/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import Layout from "./Layout"
import PostCard from "./PostCard"
import Pagination from "./Pagination"
import SEO from "./SEO"
import {
  IBlogPostListPageContext,
  IBlogPostListPageData,
  IBlogPostListPageContextWithPagination,
} from "../types"
import useThemeOptions from "../hooks/useThemeOptions"

interface IProps {
  data: IBlogPostListPageData
  pageContext: IBlogPostListPageContext | IBlogPostListPageContextWithPagination
}

const BlogList: React.FC<IProps> = ({ data, pageContext }) => {
  const { amount, blogPosts, paginationContext } = data
  const { basePath } = useThemeOptions()

  return (
    <React.Fragment>
      <SEO />
      <Layout>
        <div sx={{ mx: `auto`, maxWidth: `lineLength`, marginTop: 5 }}>
          <p
            sx={{
              textTransform: `uppercase`,
              letterSpacing: `wider`,
              fontWeight: `bold`,
              color: `mutedText`,
              variant: `styles.BlogList.title`,
            }}
          >
            <span role="img" aria-label="googly-eyes">
              👀
            </span>
            {` `}
            {amount} Posts total
          </p>
          <ul
            sx={{
              display: `grid`,
              gridTemplateColumns: `1fr`,
              gridGap: 4,
              marginBottom: 3,
              listStyle: `none`,
              padding: 0,
            }}
          >
            {blogPosts.map(blogPost => (
              <li key={blogPost.id}>
                <PostCard
                  url={`${basePath}/${blogPost.slug}`}
                  title={blogPost.title}
                  date={blogPost.date}
                  authors={blogPost.authors}
                  coverSizes={
                    blogPost.cover ? blogPost.cover.childImageSharp.fluid : null
                  }
                />
              </li>
            ))}
          </ul>
          {/* TODO: also check pagination from the themeOptions */}
          {paginationContext && <Pagination context={paginationContext} />}
        </div>
      </Layout>
    </React.Fragment>
  )
}

export default BlogList
