/* eslint-disable react-hooks/rules-of-hooks */
import Item from "@/components/item";
import Title from "../../components/title";
import axios from "axios";
import { cls } from "libs/utils";
import { BASE_URL, DATABASE_ID_BLOG, TOKEN } from "libs/config";
import { useSortedData } from "libs/usePageState";
import PageState from "@/components/pageState";
import { useBlogPageStore } from "@/store/pageStore";
import Seo from "@/components/seo";
import { useEffect, useState } from "react";

export default function Blog({ blogs }: any) {
  const { viewStyle, sortedContent } = useBlogPageStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const [tagCategory, setTagCategory] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Seo
        title={`MinSun's Blog | Blog`}
        url={BASE_URL + "/blog"}
        desc={"개발하면서 탐구한 것을 기록합니다."}
      />
      {mounted && (
        <>
          <Title
            title={"Blog"}
            subMent={"개발하면서 탐구한 것을 기록합니다."}
          />
          <div className="pb-8">
            <div className="page-state-style">
              <ul className="flex items-center gap-3 item-tagCategory md:max-w-2/3 mr-3 overflow-x-auto">
                <li
                  onClick={() => setTagCategory("all")}
                  className={cls(
                    "flex",
                    tagCategory === "all" ? "text-[#2c82f2]" : ""
                  )}
                >
                  All({blogs.results.length})
                </li>
                <li
                  onClick={() => setTagCategory("Dev")}
                  className={cls(tagCategory === "Dev" ? "text-[#2c82f2]" : "")}
                >
                  Dev
                </li>
                <li
                  onClick={() => setTagCategory("React")}
                  className={cls(
                    tagCategory === "React" ? "text-[#2c82f2]" : ""
                  )}
                >
                  React
                </li>
                <li
                  onClick={() => setTagCategory("Emotion")}
                  className={cls(
                    tagCategory === "Emotion" ? "text-[#2c82f2]" : ""
                  )}
                >
                  Emotion
                </li>
                <li
                  onClick={() => setTagCategory("Javascript")}
                  className={cls(
                    tagCategory === "Javascript" ? "text-[#2c82f2]" : ""
                  )}
                >
                  Javascript
                </li>
                <li
                  onClick={() => setTagCategory("Css")}
                  className={cls(tagCategory === "Css" ? "text-[#2c82f2]" : "")}
                >
                  Css
                </li>
                <li
                  onClick={() => setTagCategory("Etc")}
                  className={cls(tagCategory === "Etc" ? "text-[#2c82f2]" : "")}
                >
                  Etc
                </li>
              </ul>
              <PageState path={"blogs"} />
            </div>
            <div
              className={cls(
                viewStyle === "gallery"
                  ? "page-gallery-style"
                  : "page-list-style",
                "w-full"
              )}
            >
              {useSortedData(
                blogs.results.map((item: any) => (
                  <Item
                    key={item.id}
                    item={item}
                    viewStyle={viewStyle}
                    tagCategory={tagCategory}
                  />
                )),
                sortedContent
              )}
            </div>
          </div>
        </>
      )}
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
