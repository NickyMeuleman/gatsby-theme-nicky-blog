const remarkSlug = require(`remark-slug`);
const remarkGfm = require("remark-gfm");
const {
  themeOptionsWithDefaults,
  rehypeMetaAsAttributes,
} = require(`./src/utils`);

module.exports = (themeOptions = {}) => {
  const {
    assetPath,
    instances,
    gatsbyRemarkPlugins,
    remarkPlugins,
    rehypePlugins,
  } = themeOptionsWithDefaults(themeOptions);

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
      ...filesystemPluginEntries,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: assetPath,
          path: assetPath,
        },
      },
      `gatsby-plugin-image`,
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
            ...gatsbyRemarkPlugins,
          ],
          mdxOptions: {
            remarkPlugins: [remarkSlug, remarkGfm, ...remarkPlugins],
            rehypePlugins: [rehypeMetaAsAttributes, ...rehypePlugins],
          },
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
