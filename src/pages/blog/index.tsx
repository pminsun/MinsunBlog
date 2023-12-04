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
import MoveToTop from "@/components/moveToTop";

export default function Blog({ blogs }: any) {
  const { viewStyle, sortedContent } = useBlogPageStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const [tagCategory, setTagCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setFilteredList(blogs.results);
  }, [blogs.results]);

  const handleSearchInputChange = (searchWord: string) => {
    setSearch(searchWord);

    let updatedList = blogs.results;
    updatedList = blogs.results.filter((item: any) => {
      return (
        item?.properties["이름"].title[0].plain_text
          ?.toLowerCase()
          .includes(searchWord) ||
        item?.properties.Description?.rich_text[0].plain_text
          ?.toLowerCase()
          .includes(searchWord)
      );
    });
    setFilteredList(updatedList);
  };

  return (
    <>
      <Seo
        title={`MinSun's Blog | Blog`}
        url={BASE_URL + "/blog"}
        desc={"개발하면서 탐구한 것을 기록합니다."}
      />
      {mounted && (
        <div className="lg:max-w-3xl w-full mx-auto">
          <Title
            title={"Blog"}
            subMent={"개발하면서 탐구한 것을 기록합니다."}
          />
          <div className="px-5 lg:px-0 pb-8">
            <div className="border border-slate-400 rounded-2xl overflow-hidden w-full md:w-1/2 mt-10">
              <input
                value={search}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                placeholder="Search"
                className="text-sm bg-primary px-4 py-2 w-full focus:outline-0 text-black dark:text-slate-400"
              />
            </div>
            <div className="page-state-style">
              <ul className="flex items-center gap-3 item-tagCategory md:max-w-2/3 mr-3 overflow-x-auto">
                <li
                  onClick={() => setTagCategory("all")}
                  className={cls(
                    tagCategory === "all" ? "categoty-style " : ""
                  )}
                >
                  All({blogs.results.length})
                </li>
                <li
                  onClick={() => setTagCategory("Dev")}
                  className={cls(tagCategory === "Dev" ? "categoty-style" : "")}
                >
                  Dev
                </li>
                <li
                  onClick={() => setTagCategory("React")}
                  className={cls(
                    tagCategory === "React" ? "categoty-style" : ""
                  )}
                >
                  React
                </li>
                <li
                  onClick={() => setTagCategory("Emotion")}
                  className={cls(
                    tagCategory === "Emotion" ? "categoty-style" : ""
                  )}
                >
                  Emotion
                </li>
                <li
                  onClick={() => setTagCategory("TailwindCSS")}
                  className={cls(
                    tagCategory === "TailwindCSS" ? "categoty-style" : ""
                  )}
                >
                  TailwindCSS
                </li>
                <li
                  onClick={() => setTagCategory("Javascript")}
                  className={cls(
                    tagCategory === "Javascript" ? "categoty-style" : ""
                  )}
                >
                  Javascript
                </li>
                <li
                  onClick={() => setTagCategory("Css")}
                  className={cls(tagCategory === "Css" ? "categoty-style" : "")}
                >
                  Css
                </li>
                <li
                  onClick={() => setTagCategory("Etc")}
                  className={cls(tagCategory === "Etc" ? "categoty-style" : "")}
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
                filteredList.map((item: any) => (
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
            <MoveToTop />
          </div>
        </div>
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
