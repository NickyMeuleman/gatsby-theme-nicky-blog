const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)

const { createFilePath } = require(`gatsby-source-filesystem`)

// Quick-and-dirty helper to convert strings into URL-friendly slugs.
const slugify = str => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/(^-|-\$)+/g, ``)
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

// Make sure directories exist
exports.onPreBootstrap = ({ store, reporter }, options) => {
  const { program } = store.getState()

  const dirs = [
    path.join(program.directory, options.contentPath || `content`),
    path.join(program.directory, options.assetPath || `assets`),
  ]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`)
      mkdirp.sync(dir)
    }
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const { buildObjectType } = schema
  const typeDefs = `
  interface Author @nodeInterface {
    id: ID!
    shortName: String!
    name: String!
    twitter: String
  }
  type AuthorsJson implements Node & Author {
    id: ID!
    shortName: String!
    name: String!
    twitter: String
  }
  type AuthorsYaml implements Node & Author {
    id: ID!
    shortName: String!
    name: String!
    twitter: String
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
    tags: [Tag] @link(by: "name")
    author: Author @link(by: "shortName")
    title: String!
    body: String!
    published: Boolean
  }
  `

  const MdxBlogPost = buildObjectType({
    // the source in resolvers is the MdxBlogPost node
    name: `MdxBlogPost`,
    interfaces: [`Node`, `BlogPost`],
    fields: {
      id: `ID!`,
      slug: {
        type: `String!`,
        resolve: (source, args, context, info) => {
          // any other way to accomplish this?
          // This feels like running around the block to arrive nextdoor
          const mdxNode = context.nodeModel.getNodeById({
            id: source.parent,
          })
          if (mdxNode.frontmatter.slug) {
            // get slug from frontmatter field
            return slugify(mdxNode.frontmatter.slug)
          }
          // get slug from parent folder name
          const fileNode = context.nodeModel.getNodeById({ id: mdxNode.parent })
          return slugify(fileNode.relativeDirectory)
        },
      },
      title: {
        type: `String!`,
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.title
        },
      },
      date: {
        type: `Date!`,
        extensions: {
          dateformat: {},
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.date
        },
      },
      canonicalUrl: {
        type: `String`,
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.canonicalUrl
        },
      },
      tags: {
        type: `[Tag]`,
        extensions: {
          link: { by: `name` },
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          // return flat array of tags, works because of the link(by:"name") extension
          return parent.frontmatter.tags
        },
      },
      author: {
        type: `Author`,
        extensions: {
          link: { by: `shortName` },
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          // return plain author string, works because of the link(by:"name") extension
          return parent.frontmatter.author
        },
      },
      keywords: {
        type: `[String]`,
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.keywords || []
        },
      },
      excerpt: {
        type: `String!`,
        args: {
          pruneLength: {
            type: `Int`,
            defaultValue: 140,
          },
        },
        resolve: mdxResolverPassthrough(`excerpt`),
      },
      body: {
        type: `String!`,
        resolve: mdxResolverPassthrough(`body`),
      },
      cover: {
        type: `File`,
        extensions: {
          fileByRelativePath: {},
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          return parent.frontmatter.cover
        },
      },
      timeToRead: {
        type: `Int`,
        resolve: mdxResolverPassthrough(`timeToRead`),
      },
      tableOfContents: {
        type: `JSON`,
        args: {
          maxDepth: { type: `Int`, defaultValue: 6 },
        },
        resolve: mdxResolverPassthrough(`tableOfContents`),
      },
      published: {
        type: `Boolean`,
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent })
          // set default result when field is not provided
          return parent.frontmatter.published === undefined
            ? true
            : parent.frontmatter.published
        },
      },
    },
  })
  // SDL or graphql-js as argument(s) to createTypes!
  createTypes([typeDefs, MdxBlogPost])
}

exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  options
) => {
  const { createNode, createParentChildLink } = actions
  const contentPath = options.contentPath || `content`

  // Create MdxBlogPost nodes from Mdx nodes
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent) // get the File node
    const source = parent.sourceInstanceName // get folder name those files are in (contentPath)

    // only create MdxBlogPost nodes for .mdx files in the correct folder
    if (source === contentPath) {
      // duplicate (kinda) slug logic from the slug resolver
      let slug
      if (node.frontmatter.slug) {
        // get slug from frontmatter
        slug = node.frontmatter.slug
      } else {
        // get slug from parent folder name
        slug = createFilePath({ node, getNode, trailingSlash: false })
        if (slug.startsWith(`/`)) {
          slug = slug.slice(1)
        }
      }

      const fieldData = {
        // here to transform entries into Tag nodes
        tags: node.frontmatter.tags || [],
        // these fields are here to be able to use filters in graphql
        slug,
        published: node.frontmatter.published,
        date: node.frontmatter.date,
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
        // TODO: How to filter tags based on parents published field
        // field on a tagnode to be able to filter nodes belonging to unpublished posts
        // duplicate logic from blogpost published resolver.
        postPublished: node.published === undefined ? true : node.published,
      }

      const proxyNode = {
        ...fieldData,
        id: createNodeId(`${node.id}${i} >>> Tag`),
        parent: node.id,
        children: [],
        internal: {
          type: `Tag`,
          contentDigest: createContentDigest(fieldData),
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
  const basePath = options.basePath || ``
  const result = await graphql(`
    query createPagesQuery {
      allBlogPost(
        sort: { fields: date, order: DESC }
        filter: { ${
          process.env.NODE_ENV === `production`
            ? `published: { ne: false }`
            : ``
        } }
      ) {
        nodes {
          slug
        }
      }
      allTag(
        filter: { postPublished: { ne: false } }
        ) {
        distinct(field: slug)
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`error loading data from graphql`, result.error)
    return
  }

  const { allBlogPost, allTag } = result.data
  const posts = allBlogPost.nodes

  // create a page for each blogPost
  posts.forEach((post, i) => {
    const next = i === 0 ? null : posts[i - 1]
    const prev = i === posts.length - 1 ? null : posts[i + 1]
    const { slug } = post
    actions.createPage({
      path: path.join(basePath, slug),
      component: require.resolve(`./src/templates/blog-post.js`),
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
    prefixPath = options.pagination.prefixPath || ``
    postsPerPage = options.pagination.postsPerPage || 6
    numPages = Math.ceil(posts.length / postsPerPage)
  } else {
    prefixPath = ``
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
          ? `${basePath || `/`}`
          : path.join(basePath, prefixPath, `${index + 1}`),
      component: require.resolve(`./src/templates/blog-posts.js`),
      context: {
        ...paginationContext,
        basePath,
      },
    })
  })

  // create tag-list page
  actions.createPage({
    path: path.join(basePath, `tag`),
    component: require.resolve(`./src/templates/tags.js`),
    context: {
      basePath,
    },
  })

  // create a page for each tag
  allTag.distinct.forEach(tagSlug => {
    actions.createPage({
      path: path.join(basePath, `tag`, tagSlug),
      component: require.resolve(`./src/templates/tag.js`),
      context: {
        slug: tagSlug,
        basePath,
      },
    })
  })
}
