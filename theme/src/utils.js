// ugh, commonJS syntax
// utils are imported into gatsby-node, keep js only
// https://github.com/gatsbyjs/gatsby/issues/18983

// Quick-and-dirty helper to convert strings into URL-friendly slugs.
exports.slugify = (str) => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/(^-|-\$)+/g, ``);
  return slug;
};

// helper that grabs the mdx resolver when given a string fieldname
exports.mdxResolverPassthrough =
  (fieldName) => async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, {
      fieldName,
    });
    return result;
  };

exports.themeOptionsWithDefaults = (themeOptions) => {
  const assetPath = themeOptions.assetPath || `data/assets`;
  const instances = themeOptions.instances
    ? themeOptions.instances.map((instance) => {
        return {
          basePath: instance.basePath || ``,
          contentPath: instance.contentPath || `data/posts`,
          pagination: instance.pagination && {
            postsPerPage: instance.pagination.postsPerPage || 10,
            prefixPath: instance.pagination.prefixPath || ``,
          },
        };
      })
    : [
        {
          basePath: ``,
          contentPath: `data/posts`,
        },
      ];
  const gatsbyRemarkPlugins = themeOptions.gatsbyRemarkPlugins || [];
  const rehypePlugins = themeOptions.rehypePlugins || [];
  const remarkPlugins = themeOptions.remarkPlugins || [];

  return {
    rehypePlugins,
    remarkPlugins,
    gatsbyRemarkPlugins,
    assetPath,
    instances,
  };
};

// https://mdxjs.com/guides/syntax-highlighting/#syntax-highlighting-with-the-meta-field
// https://github.com/LekoArts/gatsby-themes/tree/main/packages/rehype-meta-as-attributes/
const visit = require("unist-util-visit");

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

const transformer = (ast) => {
  visit(ast, `element`, (node) => {
    let match;

    if (node.tagName === `code` && node.data && node.data.meta) {
      re.lastIndex = 0; // Reset regex.

      while ((match = re.exec(node.data.meta))) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || true;
      }
    }
  });
};

exports.rehypeMetaAsAttributes = () => transformer;
