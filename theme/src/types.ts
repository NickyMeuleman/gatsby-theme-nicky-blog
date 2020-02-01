/* INTERNAL HELPER TYPES */

/* TEMPLATES */

// pageContext of pages created in gatsby-node with templates/blog-post
export interface IBlogPostPageContext {
  slug: string
  prev: IPrevNext
  next: IPrevNext
  basePath: string
}

// pageContext of pages created in gatsby-node with templates/blog-post-list
export interface IBlogPostListPageContext {
  limit?: number
  skip?: number
  numPages?: number
  currentPage?: number
  prefixPath?: string
  basePath: string
}

// pageContext of pages created in gatsby-node with templates/tag
export interface ITagPageContext {
  slug: string
  basePath: string
}

// pageContext of pages created in gatsby-node with templates/tag-list
export interface ITagListPageContext {
  basePath: string
}

// query in templates/blog-post-list
export interface IBlogPostListTemplateQuery {
  allBlogPost: {
    totalCount: number
    edges: { node: IBlogPostPreview }[]
  }
}

// query in templates/blog-post
export interface IBlogPostTemplateQuery {
  blogPost: IBlogPost
}

// query in templates/tag
export interface ITagTemplateQuery {
  allBlogPost: {
    edges: {
      node: {
        slug: string
        title: string
      }
    }[]
    totalCount: number
  }
  tag: {
    name: string
  }
}

// query in templates/tag-list
export interface ITagListTemplateQuery {
  allTag: {
    group: {
      edges: {
        node: {
          name: string
          slug: string
        }
      }[]
      totalCount: number
    }[]
  }
}

/* COMPONENTS */

// TagList
export interface ITagSummary {
  name: string
  slug: string
  amount: number
}

// TagPage
export interface ITagPageData {
  amount: number
  name: string
  posts: { slug: string; title: string }[]
}

// BlogList
export interface IBlogPostPreview {
  id: string
  authors?: { name: string }[]
  title: string
  slug: string
  date: string
  cover: any
}

// BlogPost
export interface IBlogPost {
  excerpt: string
  id: string
  slug: string
  canonicalUrl?: string
  keywords?: string[]
  body: string
  tags?: { name: string; slug: string }[]
  authors: { name: string; twitter?: string }[]
  title: string
  cover?: any
}

// PostExtra
export interface IPrevNext {
  title: string
  slug: string
}

// SEO
export interface ISEOStaticQuery {
  site: {
    siteMetadata: {
      siteUrl: string
      title: string
      description: string
      social: {
        twitter: string
      }
    }
  }
}
