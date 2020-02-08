/** @jsx jsx */
import { Link } from "gatsby"
import Img from "gatsby-image"
import { jsx } from "theme-ui"

interface IProps {
  url: string
  title: string
  date: string
  authors?: { name: string }[]
  coverSizes?: any
}

const PostCard: React.FC<IProps> = props => {
  let authorString
  if (props.authors) {
    if (props.authors.length > 1) {
      authorString = `By multiple authors`
    } else {
      authorString = props.authors[0].name
    }
  }

  return (
    <Link
      to={props.url}
      sx={{
        textDecoration: `none`,
        color: `text`,
        ":hover": {
          "> div": {
            backgroundColor: `mutedBackground`,
            borderTopRightRadius: `sm`,
            borderBottomRightRadius: `sm`,
          },
          h2: { textDecoration: `underline` },
        },
      }}
    >
      {props.coverSizes ? (
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: [`1fr`, `1fr 2fr`],
            gridTemplateRows: [`auto`, `20ex`],
            gridGap: [0, 4],
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
              }}
            >
              {props.title}
            </h2>
            <p
              sx={{
                margin: 0,
                fontWeight: `bold`,
                color: `primary`,
              }}
            >
              {authorString}
            </p>
          </div>
        </div>
      ) : (
        // dirty hack so the background has some space on hover, but the text is still visually lined up with the images
        <div sx={{ margin: -2, padding: 2 }}>
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
            {props.title}
          </h2>
          <p
            sx={{
              margin: 0,
              fontWeight: `bold`,
              color: `primary`,
            }}
          >
            {authorString}
          </p>
        </div>
      )}
    </Link>
  )
}

export default PostCard
