module.exports = ({ contentPath = "content", basePath = "/" } = {}) => ({
  siteMetadata: {
    siteUrl: "https://myurl",
    title: "Gatsby Theme Blog by NMeuleman",
    description: "My site description",
    social: {
      twitter: "@NMeuleman",
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: contentPath || "content",
        path: contentPath || "content",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-smartypants` },
        ],
        remarkPlugins: [require(`remark-slug`)],
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-catch-links`,
  ],
})
