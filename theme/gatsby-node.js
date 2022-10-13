const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
// const blogPostTemplate = require.resolve(`./src/templates/BlogPostQuery.tsx`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const {
  slugify,
  mdxResolverPassthrough,
  themeOptionsWithDefaults,
} = require(`./src/utils`);
const { randomUUID } = require("crypto");

// Make sure directories exist
exports.onPreBootstrap = ({ store, reporter }, options) => {
  const { program } = store.getState();
  const { assetPath, instances } = themeOptionsWithDefaults(options);

  const dirs = [
    path.join(program.directory, assetPath),
    ...instances.map((instance) =>
      path.join(program.directory, instance.contentPath)
    ),
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
  interface Author implements Node {
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
    instance: NickyThemeBlogInstanceConfig!
  }
  interface BlogPost implements Node {
    id: ID!
    contentFilePath: String
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
    series: Series
    instance: NickyThemeBlogInstanceConfig!
  }
  type NickyThemeBlogConfig implements Node {
    id: ID!
    assetPath: String!
    instances: [NickyThemeBlogInstanceConfig!]!
  }
  type NickyThemeBlogInstanceConfig {
    basePath: String!
    contentPath: String!
    pagination: NickyThemeBlogPaginationConfig
  }
  type NickyThemeBlogPaginationConfig {
    postsPerPage: Int!
    prefixPath: String!
  }
  type Series {
    name: String!
    posts: [BlogPost!]!
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
      contentFilePath: {
        type: "String!",
        resolve: async (source, args, context, info) => {
          const mdxNode = context.nodeModel.getNodeById({
            id: source.parent,
          });
          return mdxNode.internal.contentFilePath;
        },
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
      series: {
        type: `Series`,
        resolve: (source, args, context, info) => {
          const mdxNode = context.nodeModel.getNodeById({
            id: source.parent,
          });
          const seriesName = mdxNode.frontmatter.series;
          const seriesPosts = context.nodeModel
            .getAllNodes({ type: `BlogPost` })
            .filter((post) => {
              // logic for MdxBlogPost (to add multi-sourcing series support expand logic for other types)
              if (source.internal.type === `MdxBlogPost`) {
                const parent = context.nodeModel.getNodeById({
                  id: post.parent,
                });
                return seriesName === parent.frontmatter.series;
              }
              return false;
            });
          return (
            seriesName && {
              name: seriesName,
              posts: seriesPosts,
            }
          );
        },
      },
      instance: {
        type: `NickyThemeBlogInstanceConfig!`,
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

  // Create NickyThemeBlogConfig node from themeOptions
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
    const { instances } = themeOptions;
    // only create MdxBlogPost nodes for .mdx files in the correct folder
    instances.forEach((instance) => {
      if (source === instance.contentPath) {
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
          instance,
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
    });
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
        // TODO: get instance data from parent
        instance: node.instance,
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
  const { instances } = themeOptionsWithDefaults(options);

  const testPostQueryResult = await graphql(`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);
  testPostQueryResult.data.allMdx.nodes.forEach((node) => {
    actions.createPage({
      path: `test/` + node.frontmatter.slug || randomUUID(),
      component: `${require.resolve(
        `./src/templates/post-template.tsx`
      )}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
  });

  const blogPostQueryResult = await graphql(`
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
          contentFilePath
          instance {
            basePath
          }
        }
      }
      allAuthor {
        nodes {
          shortName
        }
      }
    }
  `);

  if (blogPostQueryResult.errors) {
    reporter.panic(
      `error loading blogPostQueryResult from graphql`,
      blogPostQueryResult.error
    );
    return;
  }

  const { allBlogPost, allAuthor } = blogPostQueryResult.data;
  const authors = allAuthor.nodes;

  // Because we are awaiting inside this loop, we cannot use forEach, it would throw the promise each iteration returns away
  await Promise.all(
    instances.map(async (instance) => {
      const { basePath } = instance;
      const posts = allBlogPost.nodes.filter(
        (post) => post.instance.basePath === basePath
      );
      // create a page for each blogPost
      // posts.forEach((post, i) => {
      //   const next = i === 0 ? null : posts[i - 1];
      //   const prev = i === posts.length - 1 ? null : posts[i + 1];
      //   const { slug } = post;
      //   actions.createPage({
      //     path: path.join(basePath, slug),
      //     component: `${blogPostTemplate}?__contentFilePath=${post.contentFilePath}`,
      //     context: {
      //       slug,
      //       prev,
      //       next,
      //     },
      //   });
      // });

      // create (paginated) blog-list page(s)
      let numPages;
      let postsPerPage;
      let prefixPath;
      // check if the pagination option exists before using defaults in it
      if (instance.pagination) {
        prefixPath = instance.pagination.prefixPath;
        postsPerPage = instance.pagination.postsPerPage;
        numPages = Math.ceil(posts.length / postsPerPage);
      } else {
        prefixPath = ``;
        numPages = 1;
      }

      Array.from({
        length: numPages,
      }).forEach((_, index) => {
        const paginationContext = instance.pagination
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
            basePath,
          },
        });
      });

      const tagsQueryResult = await graphql(`
      query createTagPagesQuery {
        allTag(
          filter: {
            instance: { basePath: { eq: "${basePath}" } }
            postPublished: { ne: false }
          }
        ) {
          distinct(field: slug)
        }
      }
    `);

      if (tagsQueryResult.errors) {
        reporter.panic(
          `error loading tagsQueryResult from graphql`,
          tagsQueryResult.error
        );
        return;
      }

      // create tag-list page
      actions.createPage({
        path: path.join(basePath, `tag`),
        component: require.resolve(`./src/templates/TagListQuery.tsx`),
        context: {
          basePath,
        },
      });

      // create a page for each tag
      tagsQueryResult.data.allTag.distinct.forEach((tagSlug) => {
        actions.createPage({
          path: path.join(basePath, `tag`, tagSlug),
          component: require.resolve(`./src/templates/TagQuery.tsx`),
          context: {
            slug: tagSlug,
            basePath,
          },
        });
      });
    })
  );

  // create author-list page
  actions.createPage({
    path: path.join(`author`),
    component: require.resolve(`./src/templates/AuthorListQuery.tsx`),
    context: {},
  });

  // create a page for each author
  authors.forEach((author) => {
    const { shortName } = author;
    const slug = slugify(shortName);
    actions.createPage({
      path: path.join(`author`, slug),
      component: require.resolve(`./src/templates/AuthorQuery.tsx`),
      context: {
        slug,
        shortName,
      },
    });
  });
};

// https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#webpack-5-node-configuration-changed-nodefs-nodepath-
// to support the use of "path" in the theme, this turns the polyfill back on that has been disabled by default in webpack 5
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        path: require.resolve(`path-browserify`),
      },
      fallback: {
        fs: false,
      },
    },
  });
};
