/* eslint-disable react-hooks/rules-of-hooks */
import Item from "@/components/item";
import MoveToTop from "@/components/moveToTop";
import PageState from "@/components/pageState";
import Seo from "@/components/seo";
import Title from "@/components/title";
import DEFINE from "@/constant/Global";
import { useProjectPageStore } from "@/store/pageStore";
import axios from "axios";
import { BASE_URL, DATABASE_ID_PROJECT, TOKEN } from "libs/config";
import { useSortedData } from "libs/usePageState";
import { cls } from "libs/utils";
import { useEffect, useState } from "react";

export default function Project({ projects }: any) {
  const { viewStyle, sortedContent } = useProjectPageStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const [tagCategory, setTagCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setFilteredList(projects.results);
  }, [projects.results]);

  const handleSearchInputChange = (searchWord: string) => {
    setSearch(searchWord);

    let updatedList = projects.results;
    updatedList = projects.results.filter((item: any) => {
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
                  onClick={() => setTagCategory("All")}
                  className={cls(
                    tagCategory === "All" ? "categoty-selected-style" : ""
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
          </div>
          <MoveToTop />
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
