import Link from "next/link";
import LottiAnimation from "../components/ScreenElement/lottieAny";
import Title from "../components/ScreenElement/title";
import Seo from "@/components/seo";
import { DATABASE_ID_BLOG, TOKEN } from "libs/config";
import axios from "axios";
import Item from "@/components/item";
import { HiArrowNarrowRight } from "react-icons/hi";
import { IoLogoGithub, IoMail } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { cls } from "libs/utils";
import dynamic from "next/dynamic";
import DEFINE from "@/constant/Global";
const PostHeatMap = dynamic(
  () => import("@/components/ScreenElement/postHeatMap"),
  {
    ssr: false,
  }
);

export default function About({ blogs }: any) {
  const today = new Date();
  const year = today.getFullYear();
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
  ];

  const years = [2023, 2024];

  const engMonth = engMonthName[today.getMonth()].monthEng;
  const numMonth = engMonthName[today.getMonth()].monthNum;

  const createPost = blogs.results.map((x: { created_time: string }) => {
    const create = new Date(x.created_time);
    const korDate = new Date(
      create.getTime() - create.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    return korDate;
  });

  const [monthList, setMonthList] = useState({ engMonth, numMonth });
  const [yearList, setYearList] = useState(year);

  const [showMonthModal, setShowMonthModal] = useState(false);
  const selectMonth = (engMonth: string, numMonth: string) => {
    setMonthList({ engMonth, numMonth });
  };

  const toggleMonthList = () => {
    setShowMonthModal((prev) => !prev);
  };

  const mathMonth = createPost.filter(
    (x: string) => x.slice(0, 7) === yearList + "-" + monthList.numMonth
  );

  const exceptMonth = engMonthName.slice(0, 8).map((mon) => mon);

  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.overflowY = "scroll";

    return currentScrollY;
  };

  const allowScroll = (prevScrollY: number) => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.overflowY = "";
    window.scrollTo(0, prevScrollY);
  };

  useEffect(() => {
    if (showMonthModal) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [showMonthModal]);

  const dropMonthMenuBtnRef = useRef<HTMLDivElement | null>(null);
  const dropMonthMenuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutsideClose = (e: { target: any }) => {
      if (
        showMonthModal &&
        !dropMonthMenuRef.current?.contains(e.target) &&
        !dropMonthMenuBtnRef.current?.contains(e.target)
      )
        setShowMonthModal(false);
    };
    document.addEventListener("click", handleClickOutsideClose);

    return () => document.removeEventListener("click", handleClickOutsideClose);
  }, [showMonthModal]);

  const matchExceptMonth = (select: string) => {
    return exceptMonth.some((exceptMonth) => exceptMonth.monthEng === select);
  };

  return (
    <>
      <Seo title={`MinSun's Blog | Home`} />
      <div className="px-5 lg:px-0 laptop-max-width">
        <div className="flex items-center flex-col md:flex-row gap-8 w-full md:h-[468px] mb-16 lg:mb-10">
          <div className="flex flex-1 justify-between rounded-lg overflow-hidden flex-col w-full h-full bg-gray-100 dark:bg-gray-800">
            <div className="w-full h-2/3 lg:h-[312px]">
              <LottiAnimation />
            </div>
            <div className="w-full text-sm leading-6 px-4 lg:px-6 pb-6">
              <p className="text-center mb-6">
                안녕하세요.
                <br /> 새로운 기술을 학습하는 것을 좋아하는 <br /> 프론트엔드
                개발자입니다.
              </p>
              <div className="link-innerPage">
                <Link href="/project">{DEFINE.PAGES.PROJECTS.KOR}</Link>
                <Link href="/resume">{DEFINE.PAGES.RESUME.KOR}</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 h-full w-full flex-1">
            <div className="link-outerPage">
              <Link href="https://github.com/pminsun" target="_blank">
                <IoLogoGithub />
              </Link>
              <Link href="mailto:pminsun309@gmail.com">
                <IoMail />
              </Link>
              <Link href="/project">
                <IoLogoGithub />
              </Link>
            </div>
            <div className="w-full relative h-[320px] lg:h-3/4 p-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <div className="relative text-center flex items-center justify-between text-xs">
                <span>
                  {mathMonth.length > 0 ? mathMonth.length : 0} posts in{" "}
                  {monthList.engMonth}
                </span>
                <div className="text-base cursor-pointer relative">
                  <span
                    onClick={toggleMonthList}
                    ref={dropMonthMenuBtnRef}
                    className="hover:text-[#2c82f2] py-1 px-3"
                  >
                    {yearList}. {monthList.engMonth}
                  </span>
                  {showMonthModal && (
                    <div
                      ref={dropMonthMenuRef}
                      className="flex absolute left-1/2 -translate-x-1/2 z-20 overflow-hidden shadow-md bg-gray-200 dark:bg-gray-600 rounded-lg mt-1"
                    >
                      <ul>
                        {years.map((year) => (
                          <li
                            key={year}
                            onClick={() => {
                              if (matchExceptMonth(monthList.engMonth)) {
                                if (year !== 2023) {
                                  setYearList(year);
                                }
                              } else {
                                setYearList(year);
                              }
                            }}
                            className={cls(
                              yearList === year
                                ? "month-selected"
                                : "month-noneSelected",
                              matchExceptMonth(monthList.engMonth)
                                ? year === 2023
                                  ? "month-disabled hover:text-black"
                                  : "month-noneDisabled"
                                : "",
                              "month-base"
                            )}
                          >
                            {year}
                          </li>
                        ))}
                      </ul>
                      <ul className="h-48 overflow-y-auto scrollbar-none">
                        {engMonthName.map((mon) => (
                          <li
                            key={mon.monthEng}
                            onClick={() => {
                              if (
                                !(
                                  yearList === 2023 &&
                                  matchExceptMonth(mon.monthEng)
                                )
                              ) {
                                selectMonth(mon.monthEng, mon.monthNum);
                              }
                            }}
                            className={cls(
                              monthList.engMonth === mon.monthEng
                                ? "month-selected"
                                : "month-noneSelected",
                              yearList === 2023 &&
                                matchExceptMonth(mon.monthEng)
                                ? "month-disabled"
                                : "month-noneDisabled",
                              "month-base"
                            )}
                          >
                            {mon.monthEng}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <span>{blogs.results.length} total posts</span>
              </div>
              <div className="mt-2 h-full w-full">
                <PostHeatMap
                  blogs={blogs}
                  year={yearList}
                  month={monthList.numMonth}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pb-8">
          <p className="text-xl font-bold mb-5">Recent Blog Posts</p>
          <div className="w-full page-gallery-style">
            {blogs?.results.slice(0, 3).map((item: any) => (
              <Item
                key={item.id}
                item={item}
                viewStyle={"gallery"}
                tagCategory={"All"}
              />
            ))}
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 mt-6 w-36 text-sm text-gray-400 hover:text-gray-700 transition-all"
          >
            <p className="about-allposts font-semibold">
              {DEFINE.PAGES.BLOG.ENGTWO}
            </p>
            <div className="pt-[3px]">
              <HiArrowNarrowRight />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const axiosConfig = {
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-02-22",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const data = {
    page_size: 100,
  };

  const response = await axios.post(
    `https://api.notion.com/v1/databases/${DATABASE_ID_BLOG}/query`,
    data,
    axiosConfig
  );

  const blogs = response.data;
  return {
    props: { blogs },
  };
}
