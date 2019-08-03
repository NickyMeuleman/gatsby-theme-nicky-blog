# @nickymeuleman/Gatsby Theme Blog

A Gatsby theme for creating a blog.

## What you get from this theme

- A plug and play feature rich blog platform

## Installation

To use this theme in your Gatsby sites, follow these instructions:

1.  Install the theme

    ```sh
    npm install --save @nickymeuleman/gatsby-theme-blog
    ```

2.  Add the theme to your `gatsby-config.js`:

    ```js
    module.exports = {
      plugins: ["@nickymeuleman/gatsby-theme-blog"],
    }
    ```

3.  Start your site
    ```sh
    gatsby develop
    ```

## Usage

### Theme options

| Key           | Default value | Description                                           |
| ------------- | ------------- | ----------------------------------------------------- |
| `basePath`    | `""`          | Root url for all blog posts                           |
| `contentPath` | `"content"`   | Folder Location to house individual blog post-folders |
| `pagination`  | `undefined`   | Optional object, enables pagination if provided       |

#### `pagination` options

| Key            | Default value | Description                                                    |
| -------------- | ------------- | -------------------------------------------------------------- |
| `postsPerPage` | `6`           | Amount of posts per paginated page                             |
| `prefixPath`   | `undefined`   | Optional string. Path for paginated pages: eg: `/prefixPath/2` |

#### Example usage

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "@nickymeuleman/gatsby-theme-blog",
      options: {
        contentPath: "posts",
        basePath: "blog",
        pagination: {
          postsPerPage: 10,
          prefixPath: "page",
        },
      },
    },
  ],
}
```

#### Additional configuration

In addition to the theme options, there are a handful of items you can customize via the `siteMetadata` object in your site's `gatsby-config.js`

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    // Used for the site title, SEO, and header component title.
    title: `My Blog Title`,
    // Used for SEO
    description: `My site description...`,
    // Used for SEO
    social: {
      twitter: `@NMeuleman`,
    },
  },
}
```

### Adding blog posts

In the folder that was created for the `contentPath` (`content` by default). Create a folder to hold a blog post. The title of this folder will serve as the slug for the blogpost.
Inside that folder, an `index.mdx` or `index.md` file will be the blog post itself. Along this file can be several different files that can then be referenced easily inside that `.md(x)` file.

#### Example folder tree

<!-- prettier-ignore-start -->
```sh
.
└── content
    ├── my-first-post
    │   ├── index.mdx
    │   ├── coverPhoto.jpg
    │   ├── boop.png
    │   └── infinite-boop.gif
    └── my-second-post
        ├── index.md
        ├── f1-car.jpg
        └── speed-data.svg
```
<!-- prettier-ignore-end -->

#### Anatomy of a blogpost

The blogpost itself (`.md` or `.mdx` file for now, others coming soon) can have several different fields with extra information. Some of these are required.
In `.md` or `.mdx` files those are set via the frontmatter.

| Key            | Value                        | Required | Description                               |
| -------------- | ---------------------------- | -------- | ----------------------------------------- |
| `title`        | string                       | yes      | title of your blogpost                    |
| `date`         | date string                  | yes      | the date tied to the post                 |
| `canonicalUrl` | full url string              | no       | Canonical url                             |
| `author`       | author string                | no       | Author of the post                        |
| `tags`         | array of tag strings         | yes      | tags for this post                        |
| `keywords`     | array of keyword strings     | no       | keywords for SEO                          |
| `cover`        | relative path to cover image | no       | displayed as cover image, in social cards |

### Exported components

The included components are larely unstyled implementations to show an example of what is possible.
Overwriting these with you own is highly encouraged. This can be done via [component shadowing](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/).

#### List of components:

- BlogList
- BlogPost
- Pagination
- PostCard
- TagList
- TagPage
- UnderPost

#### List of layout/global style related components

- GlobalStyles
- Header
- layout
- Main

#### How to shadow components

If you want to use [component shadowing](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/), create a file at the following path in your site:

```
src/@nickymeuleman/gatsby-theme-blog/components/<component-name>.js
```

#### Example usage in MDX

In any MDX blogpost:

<!-- prettier-ignore-start -->
```mdx
import { <component-name> } from "@nickymeuleman/gatsby-theme-blog"
---
<frontmatter-fields>
---

# Lorem Ipsum
<component-name />
```
<!-- prettier-ignore-end -->

#### Example usage in React components

In any React component:

```jsx
import React from "react"
import { <component-name> } from "@nickymeuleman/gatsby-theme-blog"

export default () => (
  <div>
    <component-name />
  </div>
)
```

### dev notes

- Multi sourcing
- revamp way slugs are handled
- code blocks
- some light styling?
  - redo styles with theme-ui, like `<li>` margins?
- css reset?
- rss feed?
- offline, manifest, ...?
- icons (default icon for SEO if no fitting image found)
  - icons for tags?
  - for those seo cards: look into https://zeit.co/blog/social-og-image-cards-as-a-service
- :heavy_check_mark: canonical url support:
  - :heavy_check_mark: functionality works, now add docs
  - :heavy_check_mark: add a "originally published at" line to blogpost component
- multiple authors support
- revamp how SEO component works
  - migrate from Helmet props to nested html tags?
  - pass less props into SEO component
- Document what tasks individual components perform, how ones include others
- make tags array optional
  - cannot return null for non-nullable field MdxTag.id

* test from unforked gatsby-theme-repo
