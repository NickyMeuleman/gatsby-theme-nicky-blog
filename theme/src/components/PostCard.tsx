/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { jsx } from "theme-ui"

interface IProps {
  url: string
  title: string
  date: string
  authors?: { shortName: string; name: string }[]
  coverSizes?: any
  basePath: string
}

const PostCard: React.FC<IProps> = props => {
  let authorComponent
  if (props.authors) {
    if (props.authors.length > 1) {
      authorComponent = `By multiple authors`
    } else {
      authorComponent = (
        <Link
          to={`${props.basePath === `/` || props.basePath === `` ? `` : `/`}${
            props.basePath
          }/author/${props.authors[0].shortName}`}
          sx={{ variant: `styles.a`, position: `relative` }}
        >
          {` `}
          {props.authors[0].name}
          {` `}
        </Link>
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
            gridTemplateRows: [`30ex 1fr`, `20ex`],
            gridGap: [0, 4],
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
          <div>
            <p
              sx={{
                margin: 0,
                textTransform: `uppercase`,
                letterSpacing: `wider`,
                fontWeight: `bold`,
                color: `mutedText`,
              }}
            >
              {new Intl.DateTimeFormat(`en-US`, {
                year: `numeric`,
                month: `long`,
                day: `numeric`,
              }).format(new Date(props.date))}
            </p>
            <h2
              sx={{
                margin: 0,
                fontWeight: `bold`,
                color: `text`,
                lineHeight: `snug`,
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
                fontWeight: `bold`,
                color: `primary`,
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
            ":hover, :focus-within": {
              backgroundColor: `mutedBackground`,
              borderTopRightRadius: `sm`,
              borderBottomRightRadius: `sm`,
              // ? TODO: remove underline again when hovering over author link
              h2: { textDecoration: `underline` },
            },
          }}
        >
          <p
            sx={{
              margin: 0,
              textTransform: `uppercase`,
              letterSpacing: `wider`,
              fontWeight: `bold`,
              color: `mutedText`,
              lineHeight: `snug`,
            }}
          >
            {new Intl.DateTimeFormat(`en-US`, {
              year: `numeric`,
              month: `long`,
              day: `numeric`,
            }).format(new Date(props.date))}
          </p>
          <h2
            sx={{
              margin: 0,
              fontWeight: `bold`,
              color: `text`,
              lineHeight: `tight`,
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
              fontWeight: `bold`,
              color: `primary`,
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
