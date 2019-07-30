import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import * as path from "path"

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        description
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`

const SEO = ({
  meta,
  image,
  title,
  description,
  slug,
  lang,
  keywords,
  basePath,
}) => (
  <StaticQuery
    query={query}
    render={data => {
      const { siteMetadata } = data.site
      const metaDescription = description || siteMetadata.description
      const metaImage = image ? `${siteMetadata.siteUrl}${image}` : null
      const url = path.join(siteMetadata.siteUrl, basePath || "", slug || "")
      return (
        <Helmet
          htmlAttributes={{ lang: lang || "en" }}
          {...(title
            ? {
                titleTemplate: `%s - ${siteMetadata.title}`,
                title,
              }
            : {
                title: siteMetadata.title,
              })}
          meta={[
            {
              name: "description",
              content: metaDescription,
            },
            {
              property: "og:url",
              content: url,
            },
            {
              property: "og:title",
              content: title || siteMetadata.title,
            },
            {
              name: "og:description",
              content: metaDescription,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              name: "twitter:card",
              content: "summary",
            },
            {
              name: "twitter:creator",
              content: siteMetadata.social.twitter,
            },
            {
              name: "twitter:title",
              content: title || siteMetadata.title,
            },
            {
              name: "twitter:description",
              content: metaDescription,
            },
          ]
            .concat(
              metaImage
                ? [
                    {
                      property: "og:image",
                      content: metaImage,
                    },
                    {
                      name: "twitter:image",
                      content: metaImage,
                    },
                  ]
                : []
            )
            .concat(
              keywords.length > 0
                ? {
                    name: `keywords`,
                    content: keywords.join(`, `),
                  }
                : []
            )
            .concat(meta)}
        />
      )
    }}
  />
)

SEO.defaultProps = {
  meta: [],
  title: "",
  slug: "",
  lang: "en",
  keywords: [],
}

export { SEO as default }
