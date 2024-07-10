import Link from 'next/link'
import LottiAnimation from '../components/home/lottieAny'
import Seo from '@/components/layout/seo'
import { DATABASE_ID_BLOG, TOKEN } from 'libs/config'
import axios from 'axios'
import Post from '@/components/post'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { IoLogoGithub, IoMail } from 'react-icons/io5'
import { useEffect, useRef, useState } from 'react'
import { cls, korDate } from 'libs/utils'
import dynamic from 'next/dynamic'
import DEFINE from '@/constant/Global'
import { DataListObject, ListResults } from '@/InterfaceGather'
const PostHeatMap = dynamic(() => import('@/components/home/postHeatMap'), {
  ssr: false,
})

export default function Home({ combinedBlogs }: DataListObject) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const engMonthName = [
    { monthEng: DEFINE.MONTHS.JAN.ENG, monthNum: DEFINE.MONTHS.JAN.NUM },
    { monthEng: DEFINE.MONTHS.FEB.ENG, monthNum: DEFINE.MONTHS.FEB.NUM },
    { monthEng: DEFINE.MONTHS.MAR.ENG, monthNum: DEFINE.MONTHS.MAR.NUM },
    { monthEng: DEFINE.MONTHS.APR.ENG, monthNum: DEFINE.MONTHS.APR.NUM },
    { monthEng: DEFINE.MONTHS.MAY.ENG, monthNum: DEFINE.MONTHS.MAY.NUM },
    { monthEng: DEFINE.MONTHS.JUN.ENG, monthNum: DEFINE.MONTHS.JUN.NUM },
    { monthEng: DEFINE.MONTHS.JUL.ENG, monthNum: DEFINE.MONTHS.JUL.NUM },
    { monthEng: DEFINE.MONTHS.AUG.ENG, monthNum: DEFINE.MONTHS.AUG.NUM },
    { monthEng: DEFINE.MONTHS.SEP.ENG, monthNum: DEFINE.MONTHS.SEP.NUM },
    { monthEng: DEFINE.MONTHS.OCT.ENG, monthNum: DEFINE.MONTHS.OCT.NUM },
    { monthEng: DEFINE.MONTHS.NOV.ENG, monthNum: DEFINE.MONTHS.NOV.NUM },
    { monthEng: DEFINE.MONTHS.DEC.ENG, monthNum: DEFINE.MONTHS.DEC.NUM },
  ]

  const years = [2023, 2024]

  const engMonth = engMonthName[today.getMonth()].monthEng
  const numMonth = engMonthName[today.getMonth()].monthNum

  const createPost = combinedBlogs.map((x: { created_time: string }) => {
    return korDate(x.created_time)
  })

  const [monthList, setMonthList] = useState({ engMonth, numMonth })
  const [yearList, setYearList] = useState(year)
  const [modalMonth, setModalMonth] = useState(12)

  const mathMonthToday = () => {
    if (month === engMonthName.length) {
      setModalMonth(12)
    } else {
      setModalMonth(month)
    }
  }

  const [showMonthModal, setShowMonthModal] = useState(false)
  const selectMonth = (engMonth: string, numMonth: string) => {
    setMonthList({ engMonth, numMonth })
  }

  const toggleMonthList = () => {
    setShowMonthModal((prev) => !prev)
  }

  const mathMonth = createPost.filter(
    (x: string) => x.slice(0, 7) === yearList + '-' + monthList.numMonth,
  )

  const exceptMonth = engMonthName.slice(0, 8).map((mon) => mon)

  const preventScroll = () => {
    const currentScrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${currentScrollY}px`
    document.body.style.overflowY = 'scroll'

    return currentScrollY
  }

  const allowScroll = (prevScrollY: number) => {
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.top = ''
    document.body.style.overflowY = ''
    window.scrollTo(0, prevScrollY)
  }

  useEffect(() => {
    if (showMonthModal) {
      const prevScrollY = preventScroll()
      return () => {
        allowScroll(prevScrollY)
      }
    }
  }, [showMonthModal])

  const dropMonthMenuBtnRef = useRef<HTMLDivElement | null>(null)
  const dropMonthMenuRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handleClickOutsideClose = (e: MouseEvent) => {
      if (
        showMonthModal &&
        !dropMonthMenuRef.current?.contains(e.target as Node) &&
        !dropMonthMenuBtnRef.current?.contains(e.target as Node)
      )
        setShowMonthModal(false)
    }
    document.addEventListener('click', handleClickOutsideClose)

    return () => document.removeEventListener('click', handleClickOutsideClose)
  }, [showMonthModal])

  const [currentUrl, setCurrentUrl] = useState('')
  useEffect(() => {
    if (window) {
      setCurrentUrl(window.location.host)
    }
    mathMonthToday()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Seo title={`MinSun's Blog | Home`} />
      <div className="home-container laptop-max-width">
        <div className="intro-container">
          <div className="intro-left">
            <div className="intro-leftBox">
              <div className="intro-leftTopBox">
                <LottiAnimation />
              </div>
              <div className="intro-leftBottomBox">
                <p>
                  안녕하세요.
                  <br /> 새로운 기술을 학습하는 것을 좋아하는 <br /> 프론트엔드 개발자입니다.
                </p>
                <div className="link-innerPage">
                  <Link href="/project">{DEFINE.PAGES.PROJECTS.KOR}</Link>
                </div>
              </div>
            </div>
            <div className="link-outerPage">
              <Link href="https://github.com/pminsun" target="_blank">
                <IoLogoGithub />
              </Link>
              <Link href="mailto:pminsun309@gmail.com">
                <IoMail />
              </Link>
            </div>
          </div>
          <div className="intro-right">
            <div className="calendarSelect-container">
              <span>
                {mathMonth.length > 0 ? mathMonth.length : 0} posts in {monthList.engMonth}
              </span>
              <div className="calendarSelect-center">
                <span onClick={toggleMonthList} ref={dropMonthMenuBtnRef}>
                  {yearList}. {monthList.engMonth}
                </span>
                {showMonthModal && (
                  <div ref={dropMonthMenuRef} className="calendarSelect-modal ">
                    <ul className="year-unit">
                      {years.map((year) => (
                        <li
                          key={year}
                          onClick={() => {
                            if (year !== 2023) {
                              setYearList(year)
                              selectMonth(engMonthName[0].monthEng, engMonthName[0].monthNum)
                            } else {
                              setYearList(year)
                              selectMonth(engMonthName[8].monthEng, engMonthName[8].monthNum)
                            }
                          }}
                          className={cls(yearList === year ? 'month-selected' : '')}
                        >
                          {year}
                        </li>
                      ))}
                    </ul>
                    <ul className="month-unit scrollbar-none">
                      {yearList === 2023 &&
                        engMonthName.slice(8).map((mon) => (
                          <li
                            key={mon.monthEng}
                            onClick={() => {
                              selectMonth(mon.monthEng, mon.monthNum)
                            }}
                            className={cls(
                              monthList.engMonth === mon.monthEng
                                ? 'month-selected'
                                : 'month-noneDisabled',
                            )}
                          >
                            {mon.monthEng}
                          </li>
                        ))}
                      {yearList !== 2023 &&
                        engMonthName.slice(0, modalMonth).map((mon) => (
                          <li
                            key={mon.monthEng}
                            onClick={() => {
                              selectMonth(mon.monthEng, mon.monthNum)
                            }}
                            className={cls(
                              monthList.engMonth === mon.monthEng
                                ? 'month-selected'
                                : 'month-noneDisabled',
                            )}
                          >
                            {mon.monthEng}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <span>{combinedBlogs.length} total posts</span>
            </div>
            <PostHeatMap combinedBlogs={combinedBlogs} year={yearList} month={monthList.numMonth} />
          </div>
        </div>
        <div className="recentPost-container">
          <div className="recentPostTop-title">
            <p className="title">Recent Blog Posts</p>
            <Link href="/blog" className="goto-allpost">
              <p className="about-allposts">{DEFINE.PAGES.BLOG.ENGTWO}</p>
              <div>
                <HiArrowNarrowRight />
              </div>
            </Link>
          </div>

          <div className="page-gallery-style post-content-area page-default-style lg:!min-h-[300px]">
            {combinedBlogs.slice(0, 3).map((item: ListResults) => (
              <Post key={item.id} item={item} viewStyle={'gallery'} tagCategory={'All'} />
            ))}
          </div>
        </div>
      </div>
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
