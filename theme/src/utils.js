// ugh, commonJS syntax
// utils are imported into gatsby-node, keep js only
// https://github.com/gatsbyjs/gatsby/issues/18983

// Quick-and-dirty helper to convert strings into URL-friendly slugs.
exports.slugify = str => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/(^-|-\$)+/g, ``)
  return slug
}

// helper that grabs the mdx resolver when given a string fieldname
exports.mdxResolverPassthrough = fieldName => async (
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

exports.themeOptionsWithDefaults = themeOptions => {
  const basePath = themeOptions.basePath || ``
  const contentPath = themeOptions.contentPath || `content`
  const assetPath = themeOptions.assetPath || `assets`
  const pagination = {
    postsPerPage: themeOptions.pagination.postsPerPage || 6,
    prefixPath: themeOptions.pagination.prefixPath || ``,
  }

  return {
    basePath,
    contentPath,
    assetPath,
    pagination,
  }
}
