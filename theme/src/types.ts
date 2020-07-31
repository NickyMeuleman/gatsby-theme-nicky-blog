// TableOfContents
// TODO: make recursive, to 6 levels
export interface ITableOfContents {
  items: ITableOfContentsItem[];
}

export interface ITableOfContentsItem {
  url?: string;
  title?: string;
  items?: ITableOfContentsItem[];
}

// Series
export interface ISeries {
  name: string;
  posts: [IBlogPost];
}

// BlogList
export interface IBlogPostPreview {
  id: string;
  authors?: { shortName: string; name: string }[];
  title: string;
  slug: string;
  date: string;
  cover?: any;
  instance: { basePath: string };
}

// BlogPostPage
export interface IBlogPost {
  excerpt: string;
  id: string;
  slug: string;
  canonicalUrl?: string;
  keywords?: string[];
  body: string;
  tags?: { name: string; slug: string }[];
  authors: { shortName: string; name: string; twitter?: string }[];
  title: string;
  cover?: any;
  date: string;
  updatedAt: string;
  tableOfContents: ITableOfContents;
  series: ISeries;
  instance: IThemeInstanceOptions;
}

// PostExtra
export interface IPrevNext {
  title: string;
  slug: string;
  instance: { basePath: string };
}

// SEO
export interface ISEOStaticQuery {
  site: {
    siteMetadata: {
      siteUrl: string;
      title: string;
      description: string;
      social: {
        twitter: string;
      };
    };
  };
}

// query in templates/AuthorListQuery
export interface IAuthorListTemplateQuery {
  allAuthor: {
    totalCount: number;
    nodes: {
      id: string;
      name: string;
      shortName: string;
      twitter?: string;
    }[];
  };
}

// pageContext of pages created in gatsby-node with templates/AuthorListQuery
export interface IAuthorListPageContext {}

// AuthorListPage
export interface IAuthorListPageData {
  amount: number;
  authors: {
    id: string;
    name: string;
    shortName: string;
    twitter?: string;
  }[];
}

// query in templates/AuthorQuery
export interface IAuthorTemplateQuery {
  author: {
    name: string;
    shortName: string;
    twitter?: string;
  };
  allBlogPost: {
    totalCount: number;
    nodes: IBlogPostPreview[];
  };
}

// pageContext of pages created in gatsby-node with templates/AuthorQuery
export interface IAuthorPageContext {
  slug: string;
  shortName: string;
}

// AuthorPage
export interface IAuthorPageData {
  amount: number;
  author: {
    name: string;
    shortName: string;
    twitter?: string;
  };
  posts: IBlogPostPreview[];
}

// query in templates/BlogPostListQuery
export interface IBlogPostListTemplateQuery {
  allBlogPost: {
    totalCount: number;
    nodes: IBlogPostPreview[];
  };
}

// pageContext of pages created in gatsby-node with templates/BlogPostListQuery without pagination
export interface IBlogPostListPageContext {
  basePath: string;
}
// pageContext of pages created in gatsby-node with templates/BlogPostListQuery with pagination
export interface IBlogPostListPageContextWithPagination
  extends IBlogPostListPageContext {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  basePath: string;
  prefixPath: string;
}

// BlogPostListPage
export interface IBlogPostListPageData {
  amount: number;
  blogPosts: IBlogPostPreview[];
  paginationContext?: IBlogPostListPageContextWithPagination;
}

// query in templates/BlogPostQuery
export interface IBlogPostTemplateQuery {
  blogPost: IBlogPost;
}

// pageContext of pages created in gatsby-node with templates/BlogPostQuery
export interface IBlogPostPageContext {
  slug: string;
  prev?: IPrevNext;
  next?: IPrevNext;
}

// BlogPostPage
export interface IBlogPostPageData {
  post: IBlogPost;
}

// query in templates/TagListQuery
export interface ITagListTemplateQuery {
  allTag: {
    group: {
      nodes: {
        name: string;
        slug: string;
      }[];
      totalCount: number;
    }[];
  };
}

// pageContext of pages created in gatsby-node with templates/TagListQuery
export interface ITagListPageContext {
  basePath: string;
}

// TagList
export interface ITagListPageData {
  tags: {
    name: string;
    slug: string;
    amount: number;
  }[];
}

// query in templates/TagQuery
export interface ITagTemplateQuery {
  allBlogPost: {
    nodes: {
      slug: string;
      title: string;
    }[];
    totalCount: number;
  };
  tag: {
    name: string;
  };
}

// pageContext of pages created in gatsby-node with templates/TagQuery
export interface ITagPageContext {
  slug: string;
  basePath: string;
}

// TagPage
export interface ITagPageData {
  amount: number;
  name: string;
  posts: { slug: string; title: string }[];
}

// @nickymeuleman/gatsby-theme-blog options
export interface IThemeOptions {
  id: string;
  assetPath: string;
  instances: IThemeInstanceOptions[];
}

export interface IThemeInstanceOptions {
  basePath: string;
  contentPath: string;
  pagination?: {
    postsPerPage: number;
    prefixPath: string;
  };
}
