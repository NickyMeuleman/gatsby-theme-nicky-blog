const fs = require(`fs`)
const path = require("path")

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
  interface Tag @nodeInterface {
    id: ID!
    name: String
    slug: String
  }`)
  actions.createTypes(`
  type mdxTag implements Node & Tag {
    id: ID!
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
      tags: [mdxTag]!
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

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const source = parent.sourceInstanceName
    // Create source field (according to contentPath)
    if (source === contentPath) {
      let slug = createFilePath({ node, getNode })
      if (slug.endsWith("/")) {
        // if user entered basePath that ends in "/"
        slug = slug.slice(0, -1)
      }
      const fieldData = {
        title: node.frontmatter.title,
        tags: (node.frontmatter.tags || []).map(tag => ({
          name: tag,
          slug: slugify(tag),
        })),
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
      createParentChildLink({ parent, child: node })
    }
  }
  if (node.internal.type === `BlogPost`) {
    ;(node.tags || []).forEach((tag, i) => {
      const fieldData = {
        name: tag.name,
        slug: tag.slug,
      }
      // create a Tag node that satisfies the Tag type we created in createTypes
      createNode({
        ...fieldData,
        // Required fields.
        id: createNodeId(`${node.id}${i} >>> mdxTag`),
        parent: node.id,
        children: [],
        internal: {
          type: `mdxTag`,
          contentDigest: createContentDigest(fieldData),
          content: JSON.stringify(fieldData),
          description: `mdx Tags`,
        },
      })
    })
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
          }
        }
      }
      allTag {
        distinct(field: slug)
      }
    }
  `)

  if (result.errors) {
    reporter.panic("error loading data from graphql", result.error)
    return
  }

  const { allBlogPost, allTag } = result.data
  const posts = allBlogPost.edges

  // create a page for each blogPost
  posts.forEach(({ node: post }, i) => {
    const next = i === 0 ? null : posts[i - 1].node
    const prev = i === posts.length - 1 ? null : posts[i + 1].node
    const { slug } = post
    actions.createPage({
      path: path.join(basePath, slug),
      component: require.resolve("./src/templates/blog-post.js"),
      context: {
        slug,
        prev,
        next,
        basePath,
      },
    })
  })

  // create (paginated) blog-list page(s)
  let numPages
  let postsPerPage
  let prefixPath
  if (options.pagination) {
    prefixPath = options.pagination.prefixPath || ""
    postsPerPage = options.pagination.postsPerPage || 6
    numPages = Math.ceil(posts.length / postsPerPage)
  } else {
    prefixPath = ""
    numPages = 1
  }

  Array.from({
    length: numPages,
  }).forEach((_, index) => {
    const paginationContext = options.pagination
      ? {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages,
          currentPage: index + 1,
          prefixPath,
        }
      : {}
    actions.createPage({
      path:
        index === 0
          ? basePath
          : path.join(basePath, prefixPath, `${index + 1}`),
      component: require.resolve("./src/templates/blog-posts.js"),
      context: {
        ...paginationContext,
        basePath,
      },
    })
  })

  // create tag-list page
  actions.createPage({
    path: path.join(basePath, "tag"),
    component: require.resolve("./src/templates/tags.js"),
    context: {
      basePath,
    },
  })

  // create a page for each tag
  allTag.distinct.forEach(tagSlug => {
    actions.createPage({
      path: path.join(basePath, "tag", tagSlug),
      component: require.resolve("./src/templates/tag.js"),
      context: {
        slug: tagSlug,
        basePath,
      },
    })
  })
}
