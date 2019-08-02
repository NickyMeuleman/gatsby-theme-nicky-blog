/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
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
        // basePath: "/blog",
        // not specifying the pagination object will create a single listing page
        pagination: {
          // postsPerPage: 6,
          // prefixPath: "page"
        }
      },
    },
  ],
}
