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

// Make sure the content directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "content"
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const { buildObjectType } = schema
  const typeDefs = `
  interface Author @nodeInterface {
    id: ID!
    name: String!
    twitter: String!
  }
  type AuthorsJson implements Node & Author {
    id: ID!
    name: String!
    twitter: String!
  }
  type AuthorsYaml implements Node & Author {
    id: ID!
    name: String!
    twitter: String!
  }
  type Tag implements Node {
    id: ID!
    name: String!
    slug: String!
  }
  interface BlogPost @nodeInterface {
    id: ID!
    date: Date! @dateformat
    slug: String!
    tags: [Tag]
    author: Author
    title: String!
    body: String!
  }
  `

  const MdxBlogPost = buildObjectType({
    // the source in resolvers is the MdxBlogPost node
    name: "MdxBlogPost",
    interfaces: ["Node", "BlogPost"],
    fields: {
      id: "ID!",
      slug: {
        type: "String!",
        resolve: (source, args, context, info) => {
          // any other way to accomplish this?
          // This feels like running around the block to arrive nextdoor
          const mdxNode = context.nodeModel.getNodeById({
            id: source.parent,
          })
          const fileNode = context.nodeModel.getNodeById({ id: mdxNode.parent })
          return fileNode.relativeDirectory
        },
      },
      title: {
        type: "String!",
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.title
        },
      },
      date: {
        type: "Date!",
        extensions: {
          dateformat: {},
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.date
        },
      },
      canonicalUrl: {
        type: "String",
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.canonicalUrl
        },
      },
      tags: {
        type: "[Tag]",
        extensions: {
          link: { by: "name" },
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          // return flat array of tags, works because of the link(by:"name") extension
          return parent.frontmatter.tags
        },
      },
      author: {
        type: "Author",
        extensions: {
          link: { by: "name" },
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          // return plain author string, works because of the link(by:"name") extension
          return parent.frontmatter.author
        },
      },
      keywords: {
        type: "[String]",
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.keywords || []
        },
      },
      excerpt: {
        type: "String!",
        args: {
          pruneLength: {
            type: "Int",
            defaultValue: 140,
          },
        },
        resolve: mdxResolverPassthrough(`excerpt`),
      },
      body: {
        type: "String!",
        resolve: mdxResolverPassthrough(`body`),
      },
      cover: {
        type: "File",
        extensions: {
          fileByRelativePath: {},
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.cover
        },
      },
      timeToRead: {
        type: "Int",
        resolve: mdxResolverPassthrough(`timeToRead`),
      },
      tableOfContents: {
        type: "JSON",
        args: {
          maxDepth: { type: "Int", defaultValue: 6 },
        },
        resolve: mdxResolverPassthrough(`tableOfContents`),
      },
    },
  })
  // SDL or graphql-js as argument(s) to createTypes!
  createTypes([typeDefs, MdxBlogPost])
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  const { createNode, createParentChildLink } = actions
  const contentPath = options.contentPath || "content"

  // Create MdxBlogPost nodes from Mdx nodes
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent) // get the File node
    const source = parent.sourceInstanceName // get folder name those files are in

    // only create MdxBlogPost nodes for .mdx files in the correct folder
    if (source === contentPath) {
      // duplicate (kinda) slug logic from the slug resolver
      let slug = createFilePath({ node, getNode, trailingSlash: false })
      if (slug.startsWith("/")) {
        slug = slug.slice(1)
      }

      const fieldData = {
        // leaving tags array here to transform entries into Tag types later
        tags: node.frontmatter.tags || [],
        // leaving slug here because I want to be able to filter BlogPosts based on it
        slug,
      }

      const proxyNode = {
        ...fieldData,
        id: createNodeId(`${node.id} >>> MdxBlogPost`),
        parent: node.id,
        children: [],
        internal: {
          type: `MdxBlogPost`,
          contentDigest: node.internal.contentDigest,
          content: JSON.stringify(fieldData),
          description: `MdxBlogPost node`,
        },
      }
      createNode(proxyNode)
      createParentChildLink({ parent: node, child: proxyNode })
    }
  }

  // Create Tag nodes from MdxBlogPost nodes
  if (node.internal.type === `MdxBlogPost`) {
    // creating a Tag node for every entry in an MdxBlogPost tag array
    node.tags.forEach((tag, i) => {
      const fieldData = {
        name: tag,
        slug: slugify(tag),
      }

      const proxyNode = {
        ...fieldData,
        id: createNodeId(`${node.id}${i} >>> Tag`),
        parent: node.id,
        children: [],
        internal: {
          type: `Tag`,
          contentDigest: node.internal.contentDigest,
          content: JSON.stringify(fieldData),
          description: `Tag node`,
        },
      }

      createNode(proxyNode)
      createParentChildLink({ parent: node, child: proxyNode })
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || ""
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
          ? `${basePath || "/"}`
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
