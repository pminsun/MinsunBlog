/* eslint-disable react-hooks/rules-of-hooks */
import Post from "@/components/post";
import MoveToTop from "@/components/ScreenElement/moveToTop";
import PageState from "@/components/ScreenElement/pageState";
import Seo from "@/components/seo";
import Title from "@/components/ScreenElement/title";
import DEFINE from "@/constant/Global";
import { useProjectPageStore } from "@/store/pageStore";
import axios from "axios";
import { BASE_URL, DATABASE_ID_PROJECT, TOKEN } from "libs/config";
import { useSortedData } from "libs/usePageState";
import { cls } from "libs/utils";
import { useEffect, useState } from "react";
import { ListResults, ProjectistObject } from "@/InterfaceGather";
import Pagination from "@/components/ScreenElement/pagination";

export default function Project({ projects }: ProjectistObject) {
  const { viewStyle, sortedContent } = useProjectPageStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const [tagCategory, setTagCategory] = useState<string>(
    DEFINE.TAGCATEGORY.ALL
  );
  const [search, setSearch] = useState<string>("");
  const [filteredList, setFilteredList] = useState<ListResults[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setFilteredList(projects.results);
  }, [projects.results]);

  // Paging
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * 9;
  const indexOfFirst = indexOfLast - 9;

  const handleSearchInputChange = (searchWord: string) => {
    setSearch(searchWord);

    let updatedList = projects.results;
    updatedList = projects.results.filter((item: ListResults) => {
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
        title={`MinSun's Blog | Projects`}
        url={BASE_URL + "/project"}
        desc={"진행했던 프로젝트들을 기록합니다."}
      />
      {mounted && (
        <div className="laptop-max-width">
          <Title
            title={"Projects"}
            subMent={"진행했던 프로젝트들을 기록합니다."}
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
                  onClick={() => setTagCategory(DEFINE.TAGCATEGORY.ALL)}
                  className={cls(
                    tagCategory === DEFINE.TAGCATEGORY.ALL
                      ? "categoty-selected-style"
                      : ""
                  )}
                >
                  {DEFINE.TAGCATEGORY.ALL}({projects.results.length})
                </li>
              </ul>
              <PageState path={"projects"} />
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
                filteredList.map((item: ListResults) => (
                  <Post
                    key={item.id}
                    item={item}
                    viewStyle={viewStyle}
                    tagCategory={tagCategory}
                  />
                )),
                sortedContent
              ).slice(indexOfFirst, indexOfLast)}
            </div>
          </div>
          <MoveToTop />
          <Pagination
            postsPerPage={9}
            totalPosts={projects.results?.length || 0}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
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
    `https://api.notion.com/v1/databases/${DATABASE_ID_PROJECT}/query`,
    data,
    axiosConfig
  );

  const projects = response.data;
  return {
    props: { projects },
  };
}
