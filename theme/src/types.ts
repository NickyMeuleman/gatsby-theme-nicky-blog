export interface IBlogPost {
  date: string
  authors: IAuthor[]
  slug: string
  excerpt: string
  id: string
  canonicalUrl: string
  body: string
  tags: ITag[]
  title: string
  cover?: any
  keywords?: string[]
}

export interface IBlogPostPreview {
  id: string
  authors: IAuthor[]
  title: string
  slug: string
  date: string
  cover: any
}

export interface IAuthor {
  shorName: string
  name: string
  twitter?: string
}

export interface ITag {
  name: string
  slug: string
}

export interface IBlogPostPageContext {
  slug?: string
  prev: IPrevNext
  next: IPrevNext
  basePath: string
}

export interface IBlogPostsPageContext {
  limit?: number
  skip?: number
  numPages?: number
  currentPage?: number
  prefixPath?: string
  basePath: string
}

export interface IBlogPostContext {
  slug?: string
  prev: IPrevNext
  next: IPrevNext
}

export interface IBlogPostsContext {
  limit?: number
  skip?: number
  numPages?: number
  currentPage?: number
  prefixPath?: string
  basePath: string
}

interface IPrevNext {
  title: string
  slug: string
}

export interface ITagSummary {
  name: string
  slug: string
  amount: number
}

export interface ITagPageContext {
  prefixPath?: string
  slug: string
  basePath: string
}

export interface ITagsPageContext {
  prefixPath?: string
  basePath: string
}
