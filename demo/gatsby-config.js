module.exports = {
  siteMetadata: {
    siteUrl: `https://gatsby-theme-nicky-blog.netlify.com`,
    title: `Gatsby Theme Blog by NMeuleman`,
    description: `A demo site for gatsby-theme-nicky-blog`,
    social: {
      twitter: `@NMeuleman`,
    },
  },
  plugins: [
    {
      resolve: `@nickymeuleman/gatsby-theme-blog`,
      options: {
        assetPath: `data/assets`,
        instances: [
          {
            contentPath: `data/posts`,
            pagination: { postsPerPage: 10, prefixPath: `page` },
          },
          { basePath: `notes`, contentPath: `data/notes` },
        ],
      },
    },
  ],
};
