const fs = require(`fs`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Quick-and-dirty helper to convert strings into URL-friendly slugs.
const slugify = str => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-\$)+/g, "")
  return slug
}

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "content"
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// Define the "BlogPost" type
// is there a way to just grab everything on an mdx node? no body/excerpt/timetoread/...
// should I do this in createSchemaCustomization or sourceNodes? What's the difference?
exports.sourceNodes = ({ actions, schema }) => {
  // either SDL or graphql-js!
  actions.createTypes(`
  type Tag {
    name: String
    slug: String
  }`)
  actions.createTypes(`
    type BlogPost implements Node {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      author: String!
      tags: [Tag]!
      keywords: [String]!
      excerpt(pruneLength: Int = 140): String!
      body: String!
      cover: File @fileByRelativePath
      timeToRead: Int
      tableOfContents(maxDepth: Int = 6): JSON
    }
  `)
}

// helper that grabs the mdx resolver when given a string fieldname
const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    BlogPost: {
      excerpt: {
        resolve: mdxResolverPassthrough(`excerpt`),
      },
      body: {
        resolve: mdxResolverPassthrough(`body`),
      },
      timeToRead: {
        resolve: mdxResolverPassthrough(`timeToRead`),
      },
      tableOfContents: {
        resolve: mdxResolverPassthrough(`tableOfContents`),
      },
    },
  })
}

exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  options
) => {
  const { createNode, createParentChildLink } = actions
  const contentPath = options.contentPath || "content"

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && source === contentPath) {
    let slug = createFilePath({ node, getNode })
    if (slug.endsWith("/")) {
      slug = slug.slice(0, -1)
    }
    const fieldData = {
      title: node.frontmatter.title,
      tags: (node.frontmatter.tags || []).map(tag => ({name: tag, slug:slugify(tag)})),
      slug,
      date: node.frontmatter.date,
      author: node.frontmatter.author,
      keywords: node.frontmatter.keywords,
      cover: node.frontmatter.cover,
    }

    // create a BlogPost node that satisfies the BlogPost type we created in createTypes
    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> BlogPost`),
      parent: node.id,
      children: [],
      internal: {
        type: `BlogPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Blog Posts`,
      },
    })
    createParentChildLink({ parent: fileNode, child: node })
  }
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || "/"
  const result = await graphql(`
    query createPagesQuery {
      allBlogPost(sort: { fields: date, order: DESC }) {
        edges {
          node {
            slug
            id
            tags {
              name
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic("error loading data from graphql", result.error)
    return
  }

  const { allBlogPost } = result.data
  const posts = allBlogPost.edges

  // create a page for each blogPost
  posts.forEach(({ node: post }, i) => {
    const next = i === 0 ? null : posts[i - 1].node
    const prev = i === posts.length - 1 ? null : posts[i + 1].node
    const { slug } = post
    actions.createPage({
      path: `${basePath}${slug}`,
      component: require.resolve("./src/templates/blog-post.js"),
      context: {
        slug,
        prev: prev,
        next: next,
        basePath
      },
    })
  })

  // create paginated blog-list pages
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({
    length: numPages,
  }).forEach((_, index) => {
    actions.createPage({
      path: index === 0 ? `${basePath}` : `${basePath}/${index + 1}`,
      component: require.resolve("./src/templates/blog-posts.js"),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
        basePath
      },
    })
  })

  // flatten tags per post into single array
  const tagListDuplicates = posts.reduce((acc, post) => {
    return acc.concat(post.node.tags)
  }, [])

  // filter duplicates from an array of tag objects and add amount instead
  const tagList = tagListDuplicates.reduce((acc, tag) => {
    const existingTag = acc.find(item => tag.slug === item.slug)
    if (existingTag) {
      existingTag.amount += 1
      return acc
    }
    return [...acc, {...tag, amount: 1}]
  }, [])

  // create tag-list page
  actions.createPage({
    path: `${basePath}/tag`,
    component: require.resolve("./src/templates/tags.js"),
    context: {
      tagList,
      basePath
    },
  })

  // create a page for each tag
  tagList.forEach(tag => {
    actions.createPage({
      path: `${basePath}/tag/${tag.slug}`,
      component: require.resolve("./src/templates/tag.js"),
      context: {
        tag,
        slug: tag.slug,
        basePath
      },
    })
  })
}

// try to get an imagesharp node from the cover field in the frontmatter with @dontinfer
// ! ERROR #85907  GRAPHQL

// There was an error in your GraphQL query:

// - Unknown field 'childImageSharp' on type 'File'.

// problem during createTypes call, what type is cover? Using File, ImageSharp, String causes errors.
