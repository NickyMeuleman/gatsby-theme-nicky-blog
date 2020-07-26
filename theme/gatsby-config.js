const remarkSlug = require(`remark-slug`);
const { themeOptionsWithDefaults } = require(`./src/utils`);

module.exports = (themeOptions = {}) => {
  const { assetPath, instances } = themeOptionsWithDefaults(themeOptions);
  const filesystemPluginEntries = instances.map((instance) => {
    return {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: instance.contentPath,
        path: instance.contentPath,
      },
    };
  });
  return {
    siteMetadata: {
      siteUrl: `https://myurl.com`,
      title: `Gatsby Theme Blog by NMeuleman`,
      description: `My site description`,
      social: {
        twitter: `@NMeuleman`,
      },
    },
    plugins: [
      `gatsby-plugin-typescript`,
      `gatsby-plugin-react-helmet`,
      ...filesystemPluginEntries,
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
                withWebp: true,
              },
            },
            { resolve: `gatsby-remark-copy-linked-files` },
            { resolve: `gatsby-remark-smartypants` },
          ],
          remarkPlugins: [remarkSlug],
        },
      },
      `@pauliescanlon/gatsby-mdx-embed`,
      `gatsby-transformer-json`,
      `gatsby-transformer-yaml`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-theme-ui`,
      `gatsby-plugin-catch-links`,
    ],
  };
};
