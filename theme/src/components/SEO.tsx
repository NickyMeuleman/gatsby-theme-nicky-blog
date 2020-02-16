import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import * as path from "path"
import { ISEOStaticQuery } from "../types"
import useThemeOptions from "../hooks/useThemeOptions"

interface IProps {
  title?: string
  description?: string
  slug?: string
  keywords?: string[]
  image?: string
  canonicalUrl?: string
  twitterHandle?: string
  meta?: any[]
  lang?: string
}

const SEO: React.FC<IProps> = ({
  meta,
  image,
  title,
  description,
  slug,
  lang = `en`,
  keywords,
  canonicalUrl,
  twitterHandle,
  children,
}) => {
  const { basePath } = useThemeOptions()
  const result: ISEOStaticQuery = useStaticQuery(graphql`
    query GetSiteMetadata {
      site {
        siteMetadata {
          siteUrl
          title
          description
          social {
            twitter
          }
        }
      }
    }
  `)

  const { siteMetadata } = result.site
  const metaDescription = description || siteMetadata.description
  const metaImage = image ? `${siteMetadata.siteUrl}${image}` : null
  let url = `${siteMetadata.siteUrl}${path.join(`/`, `${basePath}`, `${slug}`)}`
  if (url.endsWith(`/`)) {
    // if url ends in "/", remove it
    url = url.slice(0, -1)
  }

  return (
    // JSX element type 'Helmet' does not have any construct or call signatures.ts(2604)
    // @ts-ignore
    <Helmet
      title={title}
      defaultTitle={siteMetadata.title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={meta}
    >
      <html lang={lang || `en`} />
      <meta name="description" content={metaDescription} />
      {metaImage && <meta name="image" content={metaImage} />}
      <meta property="og:title" content={title || siteMetadata.title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={metaDescription} />
      {metaImage && <meta property="og:image" content={metaImage} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title || siteMetadata.title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}
      {/* TODO: Consistent @ or not */}
      <meta
        name="twitter:creator"
        content={`@${twitterHandle}` || siteMetadata.social.twitter}
      />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {keywords && <meta name="keywords" content={keywords.join(`, `)} />}
      {children}
    </Helmet>
  )
}

export default SEO
