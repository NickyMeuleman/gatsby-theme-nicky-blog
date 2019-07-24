import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const PostCard = props => (
  <div>
    <div>
      <Link to={props.url}>
        {props.coverSizes ? (
          <Img sizes={props.coverSizes} />
        ) : (
          <div
            style={{
              height: "100%",
            }}
          />
        )}
      </Link>
    </div>
    <div>
      <div>
        <Link to={props.url}>
          <h2>{props.title}</h2>
        </Link>
        {props.excerpt && <div>{props.excerpt}</div>}
      </div>
      <div>
        <p>
          {props.author} on {props.date}
        </p>
      </div>
    </div>
  </div>
)

export default PostCard
