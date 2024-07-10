import { PaginationType } from '@/InterfaceGather'
import { cls } from 'libs/utils'
import * as BSIcons from 'react-icons/bs'

export default function Pagination(props: PaginationType) {
  const { postsPerPage, totalPosts, currentPage, setCurrentPage } = props
  // 총 페이지 수
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  // 한 번에 보여줄 최대 페이지 번호
  const maxPageNumbers = 5
  // 현재 페이지를 기준으로 좌우에 보여줄 페이지 수
  const sidePageNumbers = Math.floor(maxPageNumbers / 2)

  // 시작 및 끝 페이지 번호 계산
  let startPageNumber = currentPage - sidePageNumbers
  let endPageNumber = currentPage + sidePageNumbers

  if (startPageNumber <= 0) {
    startPageNumber = 1
    endPageNumber = Math.min(totalPages, maxPageNumbers)
  }
  if (endPageNumber > totalPages) {
    startPageNumber = Math.max(1, totalPages - maxPageNumbers + 1)
    endPageNumber = totalPages
  }
  // 페이지 번호 배열 생성
  const displayPages = []
  for (let i = startPageNumber; i <= endPageNumber; i++) {
    displayPages.push(i)
  }

  return (
    <>
      <ul className="pagination-style">
        {/* 10페이지 뒤로 이동 */}
        {currentPage > 10 && (
          <li className="arrow aLeftDouble" onClick={() => setCurrentPage(currentPage - 10)}>
            <BSIcons.BsChevronDoubleLeft />
          </li>
        )}
        {/* 한 페이지 뒤로 이동 */}
        {currentPage > 1 && (
          <li className="arrow aLeft" onClick={() => setCurrentPage(currentPage - 1)}>
            <BSIcons.BsChevronLeft />
          </li>
        )}
        {/* 첫 페이지로 이동 */}
        {startPageNumber > 1 && (
          <li onClick={() => setCurrentPage(1)}>
            <span>1</span>
          </li>
        )}
        {/* 중간 생략 표시 */}
        {startPageNumber > 2 && (
          <li className="ellipsis">
            <span>...</span>
          </li>
        )}
        {/* 페이지 번호 표시 */}
        {displayPages.map((number: any) => (
          <li
            key={number}
            onClick={() => setCurrentPage(number)}
            className={cls(currentPage === number ? 'currentpage' : '')}
          >
            {number}
          </li>
        ))}
        {/* 중간 생략 표시 */}
        {endPageNumber < totalPages - 1 && (
          <li className="ellipsis">
            <span>...</span>
          </li>
        )}
        {/* 마지막 페이지로 이동 */}
        {endPageNumber < totalPages && (
          <li onClick={() => setCurrentPage(totalPages)}>
            <span>{totalPages}</span>
          </li>
        )}
        {/* 한 페이지 앞으로 이동 */}
        {currentPage < totalPages && (
          <li className="arrow aRight" onClick={() => setCurrentPage(currentPage + 1)}>
            <BSIcons.BsChevronRight />
          </li>
        )}
        {/* 10페이지 앞으로 이동 */}
        {currentPage <= totalPages - 10 && (
          <li className="arrow aRightDouble" onClick={() => setCurrentPage(currentPage + 10)}>
            <BSIcons.BsChevronDoubleRight />
          </li>
        )}
      </ul>
    </>
  )
}
