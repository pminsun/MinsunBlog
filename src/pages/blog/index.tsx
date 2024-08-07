/* eslint-disable react-hooks/rules-of-hooks */
import Post from '@/components/post'
import Title from '../../components/layout/title'
import axios from 'axios'
import { cls } from 'libs/utils'
import { BASE_URL, DATABASE_ID_BLOG, TOKEN } from 'libs/config'
import { useSortedData } from 'libs/usePageState'
import PageState from '@/components/post/pageState'
import { useBlogPageStore } from '@/store/pageStore'
import Seo from '@/components/layout/seo'
import { useEffect, useState } from 'react'
import MoveToTop from '@/components/layout/moveToTop'
import DEFINE from '@/constant/Global'
import { DataListObject, ListResults } from '@/InterfaceGather'
import Pagination from '@/components/layout/pagination'
import { PiWarningCircle } from 'react-icons/pi'

export default function Blog({ combinedBlogs }: DataListObject) {
  const { viewStyle, sortedContent } = useBlogPageStore()
  const [mounted, setMounted] = useState<boolean>(false)
  const [tagCategory, setTagCategory] = useState<string>(DEFINE.TAGCATEGORY.ALL)
  const [search, setSearch] = useState<string>('')
  const [filteredList, setFilteredList] = useState<ListResults[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setFilteredList(combinedBlogs)
  }, [combinedBlogs])

  // Paging
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLast = currentPage * 9
  const indexOfFirst = indexOfLast - 9

  const handleSearchInputChange = (searchWord: string) => {
    setSearch(searchWord)

    let updatedList = combinedBlogs
    updatedList = combinedBlogs.filter((item: ListResults) => {
      return (
        item?.properties['이름'].title[0].plain_text?.toLowerCase().includes(searchWord) ||
        item?.properties.Description?.rich_text[0].plain_text?.toLowerCase().includes(searchWord)
      )
    })
    setFilteredList(updatedList)
  }

  const tagCategoryCount = () => {
    let tagCount = combinedBlogs

    if (tagCategory !== DEFINE.TAGCATEGORY.ALL) {
      tagCount = combinedBlogs.filter((item: ListResults) => {
        return item?.properties['태그'].multi_select
          .map((row: any) => row.name)
          .includes(tagCategory)
      })
    }

    if (tagCategory === DEFINE.TAGCATEGORY.ETC) {
      tagCount = combinedBlogs.filter((item: ListResults) => {
        return item?.properties['태그'].multi_select
          .map((row: any) => row.name)
          .some((i) => [DEFINE.TAGCATEGORY.HTML, DEFINE.TAGCATEGORY.NEXTJS].includes(i))
      })
    }

    setFilteredList(tagCount)
  }

  useEffect(() => {
    tagCategoryCount()
    setCurrentPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagCategory])

  return (
    <>
      <Seo
        title={`MinSun's Blog | Blog`}
        url={BASE_URL + '/blog'}
        desc={'개발하면서 탐구한 것을 기록합니다.'}
      />
      {mounted && (
        <div className="laptop-max-width postList-container">
          <Title title={'Blog'} subMent={'개발하면서 탐구한 것을 기록합니다.'} />
          <div className="post-content-area">
            <div className="post-search-container">
              <input
                value={search}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                placeholder="Search"
                className="bg-primary"
              />
            </div>
            <div className="page-state-style">
              <ul className="item-tagCategory">
                <li
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.ALL)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.ALL ? 'categoty-selected-style ' : '',
                  )}
                >
                  {DEFINE.TAGCATEGORY.ALL}({combinedBlogs.length})
                </li>
                <li
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.DEV)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.DEV ? 'categoty-selected-style' : '',
                  )}
                >
                  {DEFINE.TAGCATEGORY.DEV}
                </li>
                <li
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.REACT)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.REACT ? 'categoty-selected-style' : '',
                  )}
                >
                  {DEFINE.TAGCATEGORY.REACT}
                </li>
                <li
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.EMOTION)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.EMOTION ? 'categoty-selected-style' : '',
                  )}
                >
                  {DEFINE.TAGCATEGORY.EMOTION}
                </li>
                <li
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.TAILWINDCSS)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.TAILWINDCSS ? 'categoty-selected-style' : '',
                  )}
                >
                  {DEFINE.TAGCATEGORY.TAILWINDCSS}
                </li>
                <li
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.JAVASCRIPT)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.JAVASCRIPT ? 'categoty-selected-style' : '',
                  )}
                >
                  {DEFINE.TAGCATEGORY.JAVASCRIPT}
                </li>
                <li
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.TYPESCRIPT)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.TYPESCRIPT ? 'categoty-selected-style' : '',
                  )}
                >
                  {DEFINE.TAGCATEGORY.TYPESCRIPT}
                </li>
                <li
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.CSS)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.CSS ? 'categoty-selected-style' : '',
                  )}
                >
                  {DEFINE.TAGCATEGORY.CSS}
                </li>
                <li
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.ETC)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.ETC ? 'categoty-selected-style' : '',
                  )}
                >
                  {DEFINE.TAGCATEGORY.ETC}
                </li>
              </ul>
              <PageState path={'blogs'} />
            </div>
            {filteredList.length === 0 && (
              <div className="none-post-wrap flex-center post-link-style">
                <PiWarningCircle />
                <p>검색결과가 없습니다.</p>
              </div>
            )}
            <div
              className={cls(
                viewStyle === 'gallery' ? 'page-gallery-style grid-rows-3' : 'page-list-style',
                'page-default-style',
              )}
            >
              {useSortedData(
                filteredList.map((item: ListResults) => (
                  <Post key={item.id} item={item} viewStyle={viewStyle} tagCategory={tagCategory} />
                )),
                sortedContent,
              ).slice(indexOfFirst, indexOfLast)}
            </div>
            <MoveToTop />
          </div>
          <Pagination
            postsPerPage={9}
            totalPosts={filteredList?.length || 0}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  )
}

export async function getServerSideProps() {
  const axiosConfig = {
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  }

  const data = {
    page_size: 100,
  }

  const response = await axios.post(
    `https://api.notion.com/v1/databases/${DATABASE_ID_BLOG}/query`,
    data,
    axiosConfig,
  )

  const startCursor = response.data.has_more === true ? response.data.next_cursor : null

  const remainData = {
    page_size: 100,
    start_cursor: startCursor,
  }

  const remainResponse = await axios.post(
    `https://api.notion.com/v1/databases/${DATABASE_ID_BLOG}/query`,
    remainData,
    axiosConfig,
  )

  const [blogsResponse, remainBlogsResponse] = await Promise.all([response, remainResponse])

  const originblogs = blogsResponse.data.results
  const remainBlogs = remainBlogsResponse.data.results
  const combinedBlogs = [...originblogs, ...remainBlogs]

  return {
    props: { combinedBlogs },
  }
}
