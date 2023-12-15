import Link from "next/link";
import LottiAnimation from "../components/lottieAny";
import Title from "../components/title";
import Seo from "@/components/seo";
import { DATABASE_ID_BLOG, TOKEN } from "libs/config";
import axios from "axios";
import Item from "@/components/item";
import { HiArrowNarrowRight } from "react-icons/hi";
import { IoLogoGithub, IoMail } from "react-icons/io5";
import PostHeatMap from "@/components/postHeatMap";
import { useState } from "react";

export default function About({ blogs }: any) {
  const today = new Date();
  const year = today.getFullYear();
  const engMonthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const engMonth = engMonthName[today.getMonth()];
  const currnetMonth = today.getMonth() + 1;

  const createPost = blogs.results.map((x: { created_time: string }) => {
    const create = new Date(x.created_time);
    const korDate = new Date(
      create.getTime() - create.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    return korDate;
  });

  const mathMonth = createPost.filter(
    (x: string) => x.slice(0, 7) === year + "-" + currnetMonth
  );

  const [monthList, setMonthList] = useState(engMonth);
  const [showMonth, setShowMonth] = useState(false);
  const selectMonth = (mon: string) => {
    setMonthList(mon);
  };

  const toggleMonthList = () => {
    setShowMonth((prev) => !prev);
  };

  return (
    <>
      <Seo title={`MinSun's Blog | About`} />
      <div className="px-5 lg:px-0 lg:max-w-3xl w-full mx-auto">
        <div className="flex items-center flex-col md:flex-row gap-8 w-full md:h-[468px] mb-16 lg:mb-10">
          <div className="flex flex-1 justify-between rounded-lg overflow-hidden flex-col h-full bg-gray-100 dark:bg-gray-800">
            <div className="w-full h-2/3 lg:h-[312px]">
              <LottiAnimation />
            </div>
            <div className="w-full text-sm leading-6 px-4 lg:px-6 pb-6">
              <p className="text-center mb-6">
                안녕하세요.
                <br /> 새로운 기술을 학습하는 것을 좋아하는 <br /> 프론트엔드
                개발자입니다.
                {/* 안녕하세요. 새로운 기술을 학습하는 것을 좋아하는 프론트엔드
                개발자입니다. 사용자의 니즈와 복잡한 것을 단순하고 간편하게
                만드는 것에 관심이 많으며, 정보를 공유하는 것에 즐거움을
                느낍니다. */}
              </p>
              <div className="flex gap-4">
                <Link
                  href="/project"
                  className="block py-3 flex-1 text-center rounded-lg overflow-hidden text-xs text-white bg-slate-400 hover:bg-[#2c82f2]"
                >
                  프로젝트
                </Link>
                <Link
                  href="/project"
                  className="block py-3 flex-1 text-center rounded-lg overflow-hidden text-xs text-white bg-slate-400 hover:bg-[#2c82f2]"
                >
                  프로젝트
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 h-full w-full flex-1">
            <div className="flex justify-between flex-col md:flex-row rounded-lg overflow-hidden px-4 py-6 gap-4 bg-gray-100 dark:bg-gray-800">
              <Link
                href="https://github.com/pminsun"
                target="_blank"
                className="flex items-center justify-center py-2 flex-1 text-center rounded-lg overflow-hidden text-white bg-slate-400 hover:bg-[#2c82f2]"
              >
                <IoLogoGithub className="text-2xl" />
              </Link>
              <Link
                href="mailto:pminsun309@gmail.com"
                className="flex items-center justify-center py-2 flex-1 text-center rounded-lg text-white bg-slate-400 hover:bg-[#2c82f2]"
              >
                <IoMail className="text-2xl" />
              </Link>
              <Link
                href="/project"
                className="flex items-center justify-center py-2 flex-1 text-center rounded-lg text-white bg-slate-400 hover:bg-[#2c82f2]"
              >
                <IoLogoGithub className="text-2xl" />
              </Link>
            </div>
            <div className="w-full h-3/4 p-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* <div className="text-center flex items-center justify-between text-xs">
                <span>
                  {mathMonth.length} posts in {engMonth}
                </span>
                <div className="text-base cursor-pointer relative">
                  <span
                    onClick={toggleMonthList}
                    className="hover:text-[#2c82f2] py-1 px-3"
                  >
                    {monthList}
                  </span>
                  {showMonth && (
                    <ul className="absolute z-20 shadow-md h-48 overflow-y-auto scrollbar-none bg-gray-200 rounded-lg mt-1 left-1/2 -translate-x-1/2">
                      {engMonthName.map((mon) => (
                        <li
                          key={mon}
                          onClick={() => {
                            selectMonth(mon);
                            setShowMonth(false);
                          }}
                          className="cursor-pointer text-[10px] px-5 py-1 hover:bg-[#2c82f2] hover:text-white"
                        >
                          {mon}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <span>{blogs.results.length} total posts</span>
              </div>
              <div className="mt-2 h-full w-full relative">
                <PostHeatMap blogs={blogs} />
              </div> */}
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
                tagCategory={"all"}
              />
            ))}
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 mt-6 w-36 text-sm text-gray-400 hover:text-gray-700 transition-all"
          >
            <p className="about-allposts font-semibold">Read all Posts</p>
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
