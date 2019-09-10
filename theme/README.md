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
| `prefixPath`   | `""`          | Optional string. Path for paginated pages: eg: `/prefixPath/2` |

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
    // Used for SEO and as default if an author has no twitter defined
    social: {
      twitter: `@NMeuleman`,
    },
  },
}
```

### Adding blog posts

Inside that folder, an `index.mdx` or `index.md` file will be the blog post itself. Along this file can be several different files that can then be referenced easily inside that `.md(x)` file.
In the folder that was created for the `contentPath` (`content` by default). Create a folder to hold a blog post. By default, the title of this folder will serve as the slug for the blogpost.
By default, the date the `.mdx` file was created will serve as the date for the blogpost.
(see [Anatomy of a blogpost](#anatomy-of-a-blogpost) for the ability to override these defaults).

### Adding authors

In the folder that was created for the `contentPath` (`content` by default). Create a file called `authors.json` or `authors.yaml`. This file (or files, both formats can work together) holds an array of author objects.

#### Example folder tree

<!-- prettier-ignore-start -->
```
.
├── content
│   ├── my-first-post
│   │   ├── index.mdx
│   │   ├── coverPhoto.jpg
│   │   ├── boop.png
│   │   └── infinite-boop.gif
│   └── my-second-post
│       ├── index.md
│       ├── f1-car.jpg
│       └── speed-data.svg
└── assets
    ├── authors.yaml
    └── image-used-often.jpg
```
<!-- 
# content
## my-first-post
### index.mdx
### coverPhoto.jpg
### boop.png
### infinite-boop.gif
## my-second-post
### index.md
### f1-car.jpg
### speed-data.svg
# assets
## authors.yaml 
## image-used-often.jpg
-->
<!-- prettier-ignore-end -->

#### Anatomy of an authors file

An authors file contains a top level array filled with object describing individual authors.
An author can have several different field with information specific to them.

| Key         | Value  | Required | Description                                                                 |
| ----------- | ------ | -------- | --------------------------------------------------------------------------- |
| `shortName` | string | yes      | **unique** identifier for the author, used in `author` field for blog posts |
| `name`      | string | yes      | full name eg. "Nicky Meuleman"                                              |
| `twitter`   | string | no       | twitter handle without @                                                    |

#### Anatomy of a blogpost

The blogpost itself (`.md` or `.mdx` file for now, others coming soon) can have several different fields with extra information. Some of these are required.
In `.md` or `.mdx` files those are set via the frontmatter.

| Key            | Value                                       | Required | Description                               |
| -------------- | ------------------------------------------- | -------- | ----------------------------------------- |
| `title`        | string                                      | no       | title of your blogpost                    |
| `date`         | date string                                 | no       | the date tied to the post                 |
| `canonicalUrl` | full url string                             | no       | Canonical url                             |
| `author`       | author `shortName` or array of `shortName`s | no       | Author of the post                        |
| `tags`         | array of tag strings                        | no       | tags for this post                        |
| `keywords`     | array of keyword strings                    | no       | keywords for SEO                          |
| `cover`        | relative path to cover image                | no       | displayed as cover image, in social cards |
| `published`    | boolean, defaults to `true`                 | no       | include post in production                |
| `slug`         | string                                      | no       | the last part of the URL for this post    |

notes:
The `authors` key also works, because defining multiple author**s** under a singular author key feels weird.

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

- [ ] 🚧 👷 Multi sourcing
- [ ] revamp way slugs are handled
- [ ] code blocks
- [ ] some light styling?
  - [ ] redo styles with theme-ui, like `<li>` margins?
- [ ] css reset?
- [ ] rss feed?
- [ ] offline, manifest, ...?
- [ ] icons (default icon for SEO if no fitting image found)
  - [ ] icons for tags?
  - [ ] for those seo cards: look into https://zeit.co/blog/social-og-image-cards-as-a-service
- [x] canonical url support:
  - [x] functionality works, now add docs
  - [x] add a "originally published at" line to blogpost component
- [x] multiple authors support
  - [x] multiple authors per post
  - [ ] avatar for each author, because, pretty pictures are tight (watch @theryangeorge)
  - [ ] rename "author" in graphql to "authors", it's an array
- [ ] revamp how SEO component works
  - [ ] migrate from Helmet props to nested html tags?
  - [ ] pass less props into SEO component
- [ ] Document what tasks individual components perform, how ones include others
- [x] make tags array optional
  - [x] cannot return null for non-nullable field MdxTag.id
- [x] published frontmatter field.
  - ~~[ ] option to hide unpublished articles when running "gatsby develop"?~~ hidden in blog list, individual pages exist.
- [x] different content folder for authors? (maybe together with images etc that are not directly tied to a single blogpost)
- [x] Ability to specify path in frontmatter. See: https://github.com/gatsbyjs/gatsby/pull/16611
- [x] Double images when linked like `![](image.png)` in mdx. Blurry and fullsize.
  - Eventual fix https://github.com/gatsbyjs/gatsby/issues/16242
  - temporary fix: add `plugins` instead of `gatsbyRemarkPlugins`
- [x] Add link icons next to headings via: https://theme-ui.com/recipes/linked-headings/
  - note: Why was this better than `gatsby-remark-autolink-headers` again? Saw it in a GitHub issue somewhere
  - https://github.com/ChristopherBiscardi/gatsby-mdx/issues/204 and https://github.com/gatsbyjs/gatsby/pull/14520
- [x] Refactor theme options to use defaults if not specified to avoid repeating yourself. See: https://github.com/gatsbyjs/gatsby/blob/master/themes/gatsby-theme-blog-core/utils/default-options.js
- [x] Make the date of blogposts default to the time the file was created in case the date frontmatter field was not specified.
- [x] Make title of blogposts default to the unkebabcased title of the folder.
- [x] Allow unkebabcased slugs in frontmatter
- [x] Allow blog posts as plain markdown/mdx files, not in a folder
- [ ] document loose files as blogposts
- [x] Allow author field in frontmatter to be optional
  - [x] allow for authorless posts
- [ ] Make demo website function like a big readme.
- [ ] https://github.com/gatsbyjs/gatsby/pull/16149 got merged, use it.
- [ ] https://github.com/gatsbyjs/gatsby/pull/17284 got merged, use it.
