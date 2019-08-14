module.exports = {
  siteMetadata: {
    siteUrl: "https://gatsby-theme-nicky-blog.netlify.com",
    title: "Gatsby Theme Blog by NMeuleman",
    description: "A demo site for gatsby-theme-nicky-blog",
    social: {
      twitter: "@NMeuleman",
    },
  },
  plugins: [
    {
      resolve: "@nickymeuleman/gatsby-theme-blog",
      options: {
        contentPath: "posts",
        assetPath: "data",
        // basePath: "blog",
        // not specifying the pagination object will create a single listing page
        pagination: {
          // postsPerPage: 10,
          // prefixPath: "page"
        }
      },
    },
  ],
}
