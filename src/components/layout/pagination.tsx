import { PaginationType } from '@/InterfaceGather'
import { cls } from 'libs/utils'
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs'

export default function Pagination(props: PaginationType) {
  const { postsPerPage, totalPosts, currentPage, setCurrentPage } = props
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const displayPages = []
  const maxPageNumbers = 5
  const sidePageNumbers = Math.floor(maxPageNumbers / 2)

  let startPageNumber = currentPage - sidePageNumbers
  let endPageNumber = currentPage + sidePageNumbers

  if (startPageNumber <= 0) {
    startPageNumber = 1
    endPageNumber = Math.min(totalPages, maxPageNumbers)
  }
  if (endPageNumber > totalPages) {
    startPageNumber -= endPageNumber - totalPages
    endPageNumber = totalPages
  }

  for (let i = startPageNumber; i <= endPageNumber; i++) {
    displayPages.push(i)
  }

  const showNum = displayPages.filter((n) => {
    return n > 0
  })

  return (
    <>
      <ul className="pagination-style">
        {currentPage > 10 && (
          <li className="arrow aLeftDouble" onClick={() => setCurrentPage(currentPage - 10)}>
            <BsChevronDoubleLeft />
          </li>
        )}
        {currentPage > 1 && (
          <li className="arrow aLeft" onClick={() => setCurrentPage(currentPage - 1)}>
            <BsChevronLeft />
          </li>
        )}
        {startPageNumber > 1 && (
          <li onClick={() => setCurrentPage(1)}>
            <span>1</span>
          </li>
        )}
        {startPageNumber > 2 && (
          <li className="ellipsis">
            <span>...</span>
          </li>
        )}
        {showNum.map((number: any) => (
          <li
            key={number}
            onClick={() => setCurrentPage(number)}
            className={cls(currentPage === number ? 'currentpage' : '')}
          >
            {number}
          </li>
        ))}
        {endPageNumber < totalPages - 1 && (
          <li className="ellipsis">
            <span>...</span>
          </li>
        )}
        {endPageNumber < totalPages && (
          <li onClick={() => setCurrentPage(totalPages)}>
            <span>{totalPages}</span>
          </li>
        )}
        {currentPage < totalPages && (
          <li className="arrow aRight" onClick={() => setCurrentPage(currentPage + 1)}>
            <BsChevronRight />
          </li>
        )}
        {currentPage <= totalPages - 10 && (
          <li className="arrow aRightDouble" onClick={() => setCurrentPage(currentPage + 10)}>
            <BsChevronDoubleRight />
          </li>
        )}
      </ul>
    </>
  )
}
