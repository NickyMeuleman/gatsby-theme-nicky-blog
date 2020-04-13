// Query components
export { default as BlogPostQuery } from "./src/templates/BlogPostQuery";
export { default as BlogPostListQuery } from "./src/templates/BlogPostListQuery";
export { default as TagQuery } from "./src/templates/TagQuery";
export { default as TagListQuery } from "./src/templates/TagListQuery";
export { default as AuthorQuery } from "./src/templates/AuthorQuery";
export { default as AuthorListQuery } from "./src/templates/AuthorListQuery";

// Layout components
export { default as Layout } from "./src/components/Layout";
export { default as Main } from "./src/components/Main";
export { default as Header } from "./src/components/Header";

// Meta-altering components
export { default as SEO } from "./src/components/SEO";

// Page components
export { default as BlogPostPage } from "./src/components/BlogPostPage";
export { default as BlogPostListPage } from "./src/components/BlogPostListPage";
export { default as TagPage } from "./src/components/TagPage";
export { default as TagListPage } from "./src/components/TagListPage";
export { default as AuthorPage } from "./src/components/AuthorPage";
export { default as AuthorListPage } from "./src/components/AuthorListPage";

// Mdx components
export * from "@pauliescanlon/gatsby-mdx-embed";
export { default as Aside } from "./src/components/Aside";
export { default as Headings } from "./src/components/Headings"; // this is an object with React components, not a single component!

// Regular components
export { default as PostCard } from "./src/components/PostCard";
export { default as Pagination } from "./src/components/Pagination";
export { default as PostExtra } from "./src/components/PostExtra";

// React hooks
export { default as useThemeOptions } from "./src/hooks/useThemeOptions";

// theme-ui
export { default as themeConfig } from "./src/gatsby-plugin-theme-ui/index";
