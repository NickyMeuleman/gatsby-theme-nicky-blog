const remarkSlug = require(`remark-slug`)

module.exports = ({ contentPath, basePath, assetPath } = {}) => ({
  siteMetadata: {
    siteUrl: `https://myurl.com`,
    title: `Gatsby Theme Blog by NMeuleman`,
    description: `My site description`,
    social: {
      twitter: `@NMeuleman`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: contentPath,
        path: contentPath,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: assetPath,
        path: assetPath,
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
        // ! remove plugins when https://github.com/gatsbyjs/gatsby/issues/16242 gets merged
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
        ],
        remarkPlugins: [remarkSlug],
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-catch-links`,
  ],
})
