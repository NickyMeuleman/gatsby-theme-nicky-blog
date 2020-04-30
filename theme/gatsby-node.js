const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);

const { createFilePath } = require(`gatsby-source-filesystem`);
const {
  slugify,
  mdxResolverPassthrough,
  themeOptionsWithDefaults,
} = require(`./src/utils`);

// Make sure directories exist
exports.onPreBootstrap = ({ store, reporter }, options) => {
  const { program } = store.getState();
  const { contentPath, assetPath } = themeOptionsWithDefaults(options);

  const dirs = [
    path.join(program.directory, contentPath),
    path.join(program.directory, assetPath),
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      reporter.info(`creating the ${dir} directory`);
      mkdirp.sync(dir);
    }
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions;
  const { buildObjectType } = schema;

  // Create custom directive that defaults a field to true if not specified
  createFieldExtension({
    name: `defaultTrue`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return true;
          }
          return source[info.fieldName];
        },
      };
    },
  });

  const typeDefs = `
  interface Author @nodeInterface {
    id: ID!
    shortName: String!
    name: String!
    twitter: String
    image: File @fileByRelativePath
  }
  type AuthorsJson implements Node & Author {
    id: ID!
    shortName: String!
    name: String!
    twitter: String
    image: File @fileByRelativePath
  }
  type AuthorsYaml implements Node & Author {
    id: ID!
    shortName: String!
    name: String!
    twitter: String
    image: File @fileByRelativePath
  }
  """Extend childOf types with every type of source as they are added"""
  type Tag implements Node @dontInfer @childOf(types: ["MdxBlogPost"]) {
    id: ID!
    name: String!
    slug: String!
    postPublished: Boolean
  }
  interface BlogPost @nodeInterface {
    id: ID!
    date: Date! @dateformat
    updatedAt: Date @dateformat
    slug: String!
    tags: [Tag!] @link(by: "name")
    authors: [Author!] @link(by: "shortName")
    title: String!
    body: String!
    published: Boolean @defaultTrue
    cover: File @fileByRelativePath
    excerpt: String!
    canonicalUrl: String
    keywords: [String]
    tableOfContents(maxDepth: Int = 6): JSON
  }
  type NickyThemeBlogConfig implements Node {
    id: ID!
    basePath: String!
    contentPath: String!
    assetPath: String!
    pagination: NickyThemeBlogPaginationConfig
  }
  type NickyThemeBlogPaginationConfig {
    postsPerPage: Int!
    prefixPath: String!
  }
  `;

  const MdxBlogPost = buildObjectType({
    // the source in resolvers is the MdxBlogPost node
    name: `MdxBlogPost`,
    interfaces: [`Node`, `BlogPost`],
    extensions: {
      childOf: {
        types: [`Mdx`],
      },
      dontInfer: {},
    },
    fields: {
      id: `ID!`,
      slug: {
        type: `String!`,
        resolve: (source, args, context, info) => {
          const mdxNode = context.nodeModel.getNodeById({
            id: source.parent,
          });
          if (mdxNode.frontmatter.slug) {
            // get slug from frontmatter field
            return slugify(mdxNode.frontmatter.slug);
          }
          const fileNode = context.nodeModel.getNodeById({
            id: mdxNode.parent,
          });
          // if loose file, relativeDirectory === '', which is falsy
          if (fileNode.relativeDirectory) {
            // get slug from parent folder name
            return slugify(fileNode.relativeDirectory);
          }
          return slugify(fileNode.name);
        },
      },
      title: {
        type: `String!`,
        resolve: (source, args, context, info) => {
          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });
          if (mdxNode.frontmatter.title) {
            // get title from frontmatter field
            return mdxNode.frontmatter.title;
          }
          const fileNode = context.nodeModel.getNodeById({
            id: mdxNode.parent,
          });
          if (fileNode.relativeDirectory) {
            // get title from parent folder name
            return fileNode.relativeDirectory;
          }
          // get title from file name
          return fileNode.name;
        },
      },
      date: {
        type: `Date!`,
        extensions: {
          dateformat: {},
          proxy: {},
        },
        resolve: (source, args, context, info) => {
          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });
          if (mdxNode.frontmatter.date) {
            return mdxNode.frontmatter.date;
          }
          const fileNode = context.nodeModel.getNodeById({
            id: mdxNode.parent,
          });
          return fileNode.birthTime;
        },
      },
      updatedAt: {
        type: `Date`,
        extensions: {
          dateformat: {},
          proxy: {},
        },
        resolve: (source, args, context, info) => {
          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });
          if (mdxNode.frontmatter.updatedAt) {
            return mdxNode.frontmatter.updatedAt;
          }
          const fileNode = context.nodeModel.getNodeById({
            id: mdxNode.parent,
          });
          return fileNode.modifiedTime !== fileNode.birthTime
            ? fileNode.modifiedTime
            : null;
        },
      },
      canonicalUrl: {
        type: `String`,
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent });
          return parent.frontmatter.canonicalUrl;
        },
      },
      tags: {
        type: `[Tag!]`,
        extensions: {
          link: { by: `name` },
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent });
          // return flat array of tags, works because of the link(by:"name") extension
          return parent.frontmatter.tags;
        },
      },
      authors: {
        type: `[Author!]`,
        extensions: {
          link: { by: `shortName` },
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent });
          if (parent.frontmatter.author) {
            // return plain author shortName array, works because of the link(by:"name") extension
            return [].concat(parent.frontmatter.author);
          }
          if (parent.frontmatter.authors) {
            // use the "authors" key too in the frontmatter
            // because listing multiple authors under a singular author key is whack.
            return [].concat(parent.frontmatter.authors);
          }
          return null;
        },
      },
      keywords: {
        type: `[String]`,
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent });
          return parent.frontmatter.keywords || [];
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
          const parent = context.nodeModel.getNodeById({ id: source.parent });
          // return relative path string, works because of fileByRelativePath directive
          return parent.frontmatter.cover;
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
        type: `Boolean!`,
        extensions: {
          defaultTrue: {},
        },
        resolve: (source, args, context, info) => {
          const parent = context.nodeModel.getNodeById({ id: source.parent });
          return parent.frontmatter.published;
        },
      },
    },
  });
  // SDL or graphql-js as argument(s) to createTypes!
  createTypes([typeDefs, MdxBlogPost]);
};

exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  options
) => {
  const { createNode, createParentChildLink } = actions;
  const themeOptions = themeOptionsWithDefaults(options);

  // Create NickyThemeBlogConfig node from themeOptionss
  createNode({
    ...themeOptions,
    id: createNodeId(`NickyThemeBlogConfig`),
    parent: null,
    children: [],
    internal: {
      type: `NickyThemeBlogConfig`,
      contentDigest: createContentDigest(themeOptions),
      content: JSON.stringify(themeOptions),
      description: `NickyThemeBlogConfig node`,
    },
  });

  // Create MdxBlogPost nodes from Mdx nodes
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent); // get the File node
    const source = parent.sourceInstanceName; // get folder name those files are in (contentPath)

    // only create MdxBlogPost nodes for .mdx files in the correct folder
    if (source === themeOptions.contentPath) {
      // duplicate logic from the resolvers, exists to create pages here in gatsby-node based on the slug.
      let slug;
      if (node.frontmatter.slug) {
        // get slug from frontmatter
        slug = slugify(node.frontmatter.slug);
      } else {
        // get slug from parent folder name, or loose file name
        slug = createFilePath({ node, getNode, trailingSlash: false });
        slug = slugify(slug);
        if (slug.startsWith(`/`)) {
          slug = slug.slice(1);
        }
      }
      const fieldData = {
        slug,
        // here to transform entries into Tag nodes
        tags: node.frontmatter.tags || [],
        // here because the creation of Tag nodes needs this info.
        published: node.frontmatter.published,
      };

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
      };
      createNode(proxyNode);
      createParentChildLink({ parent: node, child: proxyNode });
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
      };

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
      };

      createNode(proxyNode);
      createParentChildLink({ parent: node, child: proxyNode });
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const { basePath } = themeOptionsWithDefaults(options);
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
          title
          slug
        }
      }
      allTag(
        filter: { postPublished: { ne: false } }
        ) {
        distinct(field: slug)
      }
      allAuthor {
        nodes {
          shortName
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(`error loading data from graphql`, result.error);
    return;
  }

  const { allBlogPost, allTag, allAuthor } = result.data;
  const posts = allBlogPost.nodes;
  const authors = allAuthor.nodes;

  // create a page for each blogPost
  posts.forEach((post, i) => {
    const next = i === 0 ? null : posts[i - 1];
    const prev = i === posts.length - 1 ? null : posts[i + 1];
    const { slug } = post;
    actions.createPage({
      path: path.join(basePath, slug),
      component: require.resolve(`./src/templates/BlogPostQuery.tsx`),
      context: {
        slug,
        prev,
        next,
      },
    });
  });

  // create (paginated) blog-list page(s)
  let numPages;
  let postsPerPage;
  let prefixPath;
  // check if the pagination option exists before using defaults in it
  if (options.pagination) {
    prefixPath = themeOptionsWithDefaults(options).pagination.prefixPath;
    postsPerPage = themeOptionsWithDefaults(options).pagination.postsPerPage;
    numPages = Math.ceil(posts.length / postsPerPage);
  } else {
    prefixPath = ``;
    numPages = 1;
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
      : {};
    actions.createPage({
      path:
        index === 0
          ? `${basePath || `/`}`
          : path.join(basePath, prefixPath, `${index + 1}`),
      component: require.resolve(`./src/templates/BlogPostListQuery.tsx`),
      context: {
        ...paginationContext,
      },
    });
  });

  // create tag-list page
  actions.createPage({
    path: path.join(basePath, `tag`),
    component: require.resolve(`./src/templates/TagListQuery.tsx`),
    context: {},
  });

  // create a page for each tag
  allTag.distinct.forEach((tagSlug) => {
    actions.createPage({
      path: path.join(basePath, `tag`, tagSlug),
      component: require.resolve(`./src/templates/TagQuery.tsx`),
      context: {
        slug: tagSlug,
      },
    });
  });

  // create author-list page
  actions.createPage({
    path: path.join(basePath, `author`),
    component: require.resolve(`./src/templates/AuthorListQuery.tsx`),
    context: {},
  });

  // create a page for each author
  authors.forEach((author, i) => {
    const { shortName } = author;
    const slug = slugify(shortName);
    actions.createPage({
      path: path.join(basePath, `author`, slug),
      component: require.resolve(`./src/templates/AuthorQuery.tsx`),
      context: {
        slug,
        shortName,
      },
    });
  });
};
