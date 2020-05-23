// Query components
export { default as BlogPostQuery } from "./src/templates/BlogPostQuery";
export { default as BlogPostListQuery } from "./src/templates/BlogPostListQuery";
export { default as TagQuery } from "./src/templates/TagQuery";
export { default as TagListQuery } from "./src/templates/TagListQuery";
export { default as AuthorQuery } from "./src/templates/AuthorQuery";
export { default as AuthorListQuery } from "./src/templates/AuthorListQuery";

// Layout components
export { Layout } from "./src/components/Layout";
export { Main } from "./src/components/Main";
export { Header } from "./src/components/Header";

// Meta-altering components
export { SEO } from "./src/components/SEO";

// Page components
export { BlogPostPage } from "./src/components/BlogPostPage";
export { BlogPostListPage } from "./src/components/BlogPostListPage";
export { TagPage } from "./src/components/TagPage";
export { TagListPage } from "./src/components/TagListPage";
export { AuthorPage } from "./src/components/AuthorPage";
export { AuthorListPage } from "./src/components/AuthorListPage";

// Mdx components
export * from "@pauliescanlon/gatsby-mdx-embed";
export { Aside } from "./src/components/Aside";
export { headingObj } from "./src/components/Headings"; // this is an object with React components, not a single component!

// Regular components
export { PostCard } from "./src/components/PostCard";
export { Pagination } from "./src/components/Pagination";
export { PostExtra } from "./src/components/PostExtra";
export { CodeBlock } from "./src/components/CodeBlock";

// React hooks
export { useThemeOptions } from "./src/hooks/useThemeOptions";

// theme-ui
export { default as themeConfig } from "./src/gatsby-plugin-theme-ui/index";
