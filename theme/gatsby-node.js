const fs = require("fs")

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = "content"

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// Define the "BlogPost" type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type BlogPost implements Node @dontInfer {
      slug: String!
    }
  `)
}

// Define resolvers for custom fields
exports.createResolvers = ({createResolvers}) => {
 createResolvers({
   BlogPost: {
     slug: {
       resolve: () => "test",
     },
   },
 })
}

// https://www.gatsbyjs.org/tutorial/building-a-theme/
// pr to createtypes docs

// createtypes step is hard to understand, what is @proxy etc? (docs right now are, nog enough for me to actually understand)
// translate graph-js to SDL? like the resolve field, how? probably createResolver()
// Where is a list of types I can use in this, String, ID, Date, .. File? Clowns?