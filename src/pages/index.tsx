import Link from "next/link";
import LottiAnimation from "../components/lottieAny";
import Title from "../components/title";
import Seo from "@/components/seo";
import { DATABASE_ID_BLOG, TOKEN } from "libs/config";
import axios from "axios";
import Item from "@/components/item";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function About({ blogs }: any) {
  return (
    <>
      <Seo title={`MinSun's Blog | About`} />
      <div>
        <Title title={"About"} subMent={"저를 소개합니다"} />
        <div className="flex items-center mb-16 lg:md-0 justify-center gap-5 flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-5 text-sm leading-6">
            <p className="text-center lg:text-left">
              안녕하세요. 새로운 기술을 학습하는 것을 좋아하는 프론트엔드
              개발자입니다. 사용자의 니즈와 복잡한 것을 단순하고 간편하게 만드는
              것에 관심이 많으며, 정보를 공유하는 것에 즐거움을 느낍니다.
            </p>
            <div className="flex justify-center lg:justify-start gap-2 mt-6">
              {/* <Link
              href="/resume"
              className="block py-2 w-[80px] text-center rounded-lg text-xs text-white bg-slate-400 hover:bg-point-color"
            >
              이력서
            </Link> */}
              <Link
                href="/project"
                className="block py-2 w-[80px] text-center rounded-lg text-xs text-white bg-slate-400 hover:bg-[#2c82f2]"
              >
                프로젝트
              </Link>
            </div>
          </div>
          <div className="w-2/3 lg:w-1/2">
            <LottiAnimation />
          </div>
        </div>
        <div className="pb-8">
          <p className="text-xl font-bold mb-5">Recent Posts</p>
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
