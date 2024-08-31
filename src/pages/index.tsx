import Link from 'next/link'
import LottiAnimation from '../components/home/lottieAny'
import Seo from '@/components/layout/seo'
import { DATABASE_ID_BLOG, TOKEN } from 'libs/config'
import axios from 'axios'
import Post from '@/components/post'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { IoLogoGithub, IoMail } from 'react-icons/io5'
import DEFINE from '@/constant/Global'
import { DataListObject, ListResults } from '@/InterfaceGather'

export default function Home({ combinedBlogs }: DataListObject) {
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
          <div className="intro-right none_calendar">
            <p className="title">Recent Blog Posts</p>
            <div className="page-list-style post-content-area page-default-style lg:!min-h-[300px]">
              {combinedBlogs.slice(0, 3).map((item: ListResults) => (
                <Post key={item.id} item={item} viewStyle={'list'} tagCategory={'All'} />
              ))}
            </div>
            <Link href="/blog" className="goto-allpost">
              <p className="about-allposts">{DEFINE.PAGES.BLOG.ENGTWO}</p>
              <div>
                <HiArrowNarrowRight />
              </div>
            </Link>
          </div>
        </div>
        <div className="notice-container">
          <p className="title">공지</p>
          <div>
            <p>블로그 이전 중 입니다</p>
            <Link target="_blank" href={'https://minsun309.tistory.com/'}>
              minsun309.tistory
            </Link>
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
