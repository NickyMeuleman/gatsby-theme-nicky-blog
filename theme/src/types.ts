// BlogList
export interface IBlogPostPreview {
  id: string
  authors?: { shortName: string; name: string }[]
  title: string
  slug: string
  date: string
  cover?: any
}

// BlogPostPage
export interface IBlogPost {
  excerpt: string
  id: string
  slug: string
  canonicalUrl?: string
  keywords?: string[]
  body: string
  tags?: { name: string; slug: string }[]
  authors: { shortName: string; name: string; twitter?: string }[]
  title: string
  cover?: any
  date: string
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

// TODO: START DONE

// query in templates/author-list
export interface IAuthorListTemplateQuery {
  allAuthor: {
    totalCount: number
    nodes: {
      id: string
      name: string
      shortName: string
      twitter?: string
    }[]
  }
}

// pageContext of pages created in gatsby-node with templates/author-list
export interface IAuthorListPageContext {
  basePath: string
}

// AuthorListPage
export interface IAuthorListPageData {
  amount: number
  authors: {
    id: string
    name: string
    shortName: string
    twitter?: string
  }[]
}

// query in templates/author
export interface IAuthorTemplateQuery {
  author: {
    name: string
    shortName: string
    twitter?: string
  }
  allBlogPost: {
    totalCount: number
    nodes: IBlogPostPreview[]
  }
}

// pageContext of pages created in gatsby-node with templates/author
export interface IAuthorPageContext {
  slug: string
  shortName: string
  basePath: string
}

// AuthorPage
export interface IAuthorPageData {
  amount: number
  author: {
    name: string
    shortName: string
    twitter?: string
  }
  posts: IBlogPostPreview[]
}

// query in templates/blog-post-list
export interface IBlogPostListTemplateQuery {
  allBlogPost: {
    totalCount: number
    nodes: IBlogPostPreview[]
  }
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

// BlogPostListPage
export interface IBlogPostListPageData {
  amount: number
  blogPosts: IBlogPostPreview[]
  paginationContext?: IBlogPostListPageContext | null
}

// query in templates/blog-post
export interface IBlogPostTemplateQuery {
  blogPost: IBlogPost
}

// pageContext of pages created in gatsby-node with templates/blog-post
export interface IBlogPostPageContext {
  slug: string
  prev?: IPrevNext
  next?: IPrevNext
  basePath: string
}

// BlogPostPage
export interface IBlogPostPageData {
  post: IBlogPost
}

// query in templates/tag-list
export interface ITagListTemplateQuery {
  allTag: {
    group: {
      nodes: {
        name: string
        slug: string
      }[]
      totalCount: number
    }[]
  }
}

// pageContext of pages created in gatsby-node with templates/tag-list
export interface ITagListPageContext {
  basePath: string
}

// TagList
export interface ITagListPageData {
  tags: {
    name: string
    slug: string
    amount: number
  }[]
}

// query in templates/tag
export interface ITagTemplateQuery {
  allBlogPost: {
    nodes: {
      slug: string
      title: string
    }[]
    totalCount: number
  }
  tag: {
    name: string
  }
}

// pageContext of pages created in gatsby-node with templates/tag
export interface ITagPageContext {
  slug: string
  basePath: string
}

// TagPage
export interface ITagPageData {
  amount: number
  name: string
  posts: { slug: string; title: string }[]
}
