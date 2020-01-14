import React from "react"

interface IProps {
  date: any
  title: any
}

const blogPostOGImage: React.FC<IProps> = props => {
  console.log(`props in blogpost printer`, { props })
  return (
    <div
      style={{
        width: 1280,
        height: 720,
        padding: 30,
        paddingBottom: 0,
        boxSizing: `border-box`,
        overflowX: `hidden`,
        backgroundImage: `linear-gradient(270deg, #747dbc 21%, #8CB5D9 92%)`,
        color: `white`,
        fontFamily: `Arial, Helvetica, sans-serif`,
      }}
    >
      <div
        style={{
          fontSize: 60,
          display: `flex`,
          flexDirection: `column`,
        }}
      >
        <h1
          style={{
            fontSize: `1.4em`,
            marginBottom: 0,
          }}
        >
          {props.title}
        </h1>
        <h2 style={{ fontSize: `1em`, flexGrow: 1 }}>{props.date}</h2>
        <h2 style={{ fontSize: `1em`, textAlign: `right`, marginRight: 30 }}>
          Nicky Meuleman
        </h2>
      </div>
    </div>
  )
}

export default blogPostOGImage
