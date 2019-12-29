/** @jsx jsx */
import { Link } from "gatsby"
import Img from "gatsby-image"
import { jsx } from "theme-ui"
import { IAuthor } from "../types"

interface IProps {
  authors?: IAuthor[]
  url: string
  title: string
  date: string
  coverSizes: any
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
    <div
      sx={{
        padding: `2rem`,
        margin: `1rem`,
        border: `solid 1px #ccc`,
        "&:hover": { background: `#eee` },
      }}
    >
      <div>
        <Link to={props.url}>
          {props.coverSizes ? (
            <Img sizes={props.coverSizes} />
          ) : (
            <div
              sx={{
                height: `10rem`,
                width: `100%`,
                backgroundImage: `linear-gradient(120deg, purple, rebeccapurple)`,
                opacity: `0.95`,
              }}
              aria-label={props.title}
            />
          )}
        </Link>
      </div>
      <div>
        {/* TODO: cure divitis */}
        <div>
          <Link to={props.url}>
            <h2>{props.title}</h2>
          </Link>
        </div>
        <div>
          <p>
            {authorString} on {props.date}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostCard
