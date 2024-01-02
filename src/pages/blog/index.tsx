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
import DEFINE from "@/constant/Global";

export default function Blog({ blogs }: any) {
  const { viewStyle, sortedContent } = useBlogPageStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const [tagCategory, setTagCategory] = useState("All");
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
        <div className="laptop-max-width">
          <Title
            title={"Blog"}
            subMent={"개발하면서 탐구한 것을 기록합니다."}
          />
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
                  onClick={() => setTagCategory("All")}
                  className={cls(
                    tagCategory === "All" ? "categoty-selected-style " : ""
                  )}
                >
                  {DEFINE.TAGCATEGORY.ALL}({blogs.results.length})
                </li>
                <li
                  onClick={() => setTagCategory("Dev")}
                  className={cls(
                    tagCategory === "Dev" ? "categoty-selected-style" : ""
                  )}
                >
                  {DEFINE.TAGCATEGORY.DEV}
                </li>
                <li
                  onClick={() => setTagCategory("React")}
                  className={cls(
                    tagCategory === "React" ? "categoty-selected-style" : ""
                  )}
                >
                  {DEFINE.TAGCATEGORY.REACT}
                </li>
                <li
                  onClick={() => setTagCategory("Emotion")}
                  className={cls(
                    tagCategory === "Emotion" ? "categoty-selected-style" : ""
                  )}
                >
                  {DEFINE.TAGCATEGORY.EMOTION}
                </li>
                <li
                  onClick={() => setTagCategory("TailwindCSS")}
                  className={cls(
                    tagCategory === "TailwindCSS"
                      ? "categoty-selected-style"
                      : ""
                  )}
                >
                  {DEFINE.TAGCATEGORY.TAILWINDCSS}
                </li>
                <li
                  onClick={() => setTagCategory("Javascript")}
                  className={cls(
                    tagCategory === "Javascript"
                      ? "categoty-selected-style"
                      : ""
                  )}
                >
                  {DEFINE.TAGCATEGORY.JAVASCRIPT}
                </li>
                <li
                  onClick={() => setTagCategory("Css")}
                  className={cls(
                    tagCategory === "Css" ? "categoty-selected-style" : ""
                  )}
                >
                  {DEFINE.TAGCATEGORY.CSS}
                </li>
                <li
                  onClick={() => setTagCategory("Etc")}
                  className={cls(
                    tagCategory === "Etc" ? "categoty-selected-style" : ""
                  )}
                >
                  {DEFINE.TAGCATEGORY.ETC}
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
