import React from "react"
import { navigate, Link } from "gatsby"

const Pagination = ({ context: { numPages, currentPage }, basePath }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPageNum = currentPage - 1 === 1 ? `` : (currentPage - 1).toString()
  const nextPageNum = (currentPage + 1).toString()
  const prevPageLink = isFirst ? null : `${basePath}/${prevPageNum}`
  const nextPageLink = isLast ? null : `${basePath}/${nextPageNum}`
  const changePage = e => {
    navigate(`${basePath}/${e.target.value}`)
  }
  return (
    <div>
      <div>
        {prevPageLink ? (
          <Link to={prevPageLink}>← Newer posts</Link>
        ) : (
          <span>← Newer posts</span>
        )}
        {nextPageLink ? (
          <Link to={nextPageLink}>Older posts →</Link>
        ) : (
          <span>Older posts →</span>
        )}
      </div>
      <div>
        <span>Showing page &nbsp;</span>
        <select
          onChange={changePage}
          value={currentPage === 1 ? "" : currentPage.toString()}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <option
              value={`${i === 0 ? "" : i + 1}`}
              key={`pagination-number${i + 1}`}
            >
              {i + 1}
            </option>
          ))}
        </select>
        <span>&nbsp; of &nbsp;</span>
        <span>{numPages}</span>
      </div>
    </div>
  )
}
// class Pagination extends React.Component {

//   render() {

//     return (
//       <Pagination>

//         <Info>

//           <Arrow width="10" height="5" viewBox="0 0 10 5">
//             <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
//           </Arrow>

//         </Info>
//       </Pagination>
//     )
//   }
// }

export default Pagination
