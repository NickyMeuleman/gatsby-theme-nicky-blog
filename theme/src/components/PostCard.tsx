/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { jsx } from "theme-ui"
import useThemeOptions from "../hooks/useThemeOptions"

interface IProps {
  url: string
  title: string
  date: string
  authors?: { shortName: string; name: string }[]
  coverSizes?: any
}

const PostCard: React.FC<IProps> = props => {
  const { basePath } = useThemeOptions()
  let authorComponent
  if (props.authors) {
    if (props.authors.length > 1) {
      authorComponent = `By multiple authors`
    } else {
      authorComponent = (
        <React.Fragment>
          By{` `}
          <Link
            to={`${
              basePath === `/` || basePath === `` ? `` : `/`
            }${basePath}/author/${props.authors[0].shortName}`}
            sx={{ variant: `styles.a`, position: `relative` }}
          >
            {props.authors[0].name}
          </Link>
        </React.Fragment>
      )
    }
  }

  return (
    <React.Fragment>
      {props.coverSizes ? (
        <div
          sx={{
            position: `relative`,
            display: `grid`,
            gridTemplateColumns: [`1fr`, `1fr 2fr`],
            gridTemplateRows: [`20ex 1fr`, `20ex`],
            gridGap: [0, 4],
            variant: `styles.PostCard`,
            ":hover, :focus-within": {
              backgroundColor: `mutedBackground`,
              borderTopRightRadius: `sm`,
              borderBottomRightRadius: `sm`,
              // ? TODO: remove underline again when hovering over author link
              h2: { textDecoration: `underline` },
            },
          }}
        >
          <Img fluid={props.coverSizes} />
          <div sx={{ p: [2], pl: [2, 0] }}>
            <div
              sx={{
                margin: 0,
                marginBottom: [0, 1],
                fontSize: 0,
                textTransform: `uppercase`,
                letterSpacing: `wider`,
                fontWeight: `bold`,
                color: `mutedText`,
                variant: `styles.PostCard.date`,
              }}
            >
              <time dateTime={props.date}>
                {new Intl.DateTimeFormat(`en-US`, {
                  year: `numeric`,
                  month: `long`,
                  day: `numeric`,
                }).format(new Date(props.date))}
              </time>
            </div>
            <h2
              sx={{
                margin: 0,
                fontWeight: `bold`,
                lineHeight: `snug`,
                variant: `styles.PostCard.title`,
              }}
            >
              <Link
                to={props.url}
                sx={{
                  color: `text`,
                  textDecoration: `none`,
                  "::after": {
                    content: `""`,
                    position: `absolute`,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  },
                }}
              >
                {props.title}
              </Link>
            </h2>
            <p
              sx={{
                margin: 0,
                color: `mutedText`,
                variant: `styles.PostCard.author`,
              }}
            >
              {authorComponent}
            </p>
          </div>
        </div>
      ) : (
        <div
          sx={{
            // dirty hack so the background has some space on hover, but the text is still visually lined up with the images
            margin: -2,
            padding: 2,
            position: `relative`,
            variant: `styles.PostCard`,
            ":hover, :focus-within": {
              backgroundColor: `mutedBackground`,
              borderTopRightRadius: `sm`,
              borderBottomRightRadius: `sm`,
              // ? TODO: remove underline again when hovering over author link
              h2: { textDecoration: `underline` },
            },
          }}
        >
          <div
            sx={{
              margin: 0,
              fontSize: 0,
              textTransform: `uppercase`,
              letterSpacing: `wider`,
              fontWeight: `bold`,
              color: `mutedText`,
              lineHeight: `snug`,
              variant: `styles.PostCard.date`,
            }}
          >
            <time dateTime={props.date}>
              {new Intl.DateTimeFormat(`en-US`, {
                year: `numeric`,
                month: `long`,
                day: `numeric`,
              }).format(new Date(props.date))}
            </time>
          </div>
          <h2
            sx={{
              margin: 0,
              fontWeight: `bold`,
              color: `text`,
              lineHeight: `tight`,
              variant: `styles.PostCard.title`,
            }}
          >
            <Link
              to={props.url}
              sx={{
                textDecoration: `none`,
                color: `text`,
                "::after": {
                  content: `""`,
                  position: `absolute`,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                },
              }}
            >
              {props.title}
            </Link>
          </h2>
          <p
            sx={{
              margin: 0,
              color: `mutedText`,
              variant: `styles.PostCard.author`,
            }}
          >
            {authorComponent}
          </p>
        </div>
      )}
    </React.Fragment>
  )
}

export default PostCard
