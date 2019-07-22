/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-nicky-blog",
      options: {
        contentPath: "posts",
        basePath: "/writes"
      },
    },
  ],
}
