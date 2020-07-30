module.exports = {
  siteMetadata: {
    siteUrl: `https://gatsby-theme-nicky-blog.netlify.com`,
    title: `Gatsby Theme Blog by NMeuleman`,
    description: `A demo site for gatsby-theme-nicky-blog`,
    social: {
      twitter: `@NMeuleman`,
    },
  },
  // plugins: [`@nickymeuleman/gatsby-theme-blog`],
  plugins: [
    {
      resolve: `@nickymeuleman/gatsby-theme-blog`,
      options: {
        assetPath: `data/assets`,
        instances: [
          {
            contentPath: `data/posts`,
            pagination: { postsPerPage: 2, prefixPath: `page` },
          },
          { basePath: `garden`, contentPath: `data/notes` },
          { basePath: `boops`, contentPath: `data/boops` },
        ],
      },
    },
  ],
};
