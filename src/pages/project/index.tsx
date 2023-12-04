/* eslint-disable react-hooks/rules-of-hooks */
import Item from "@/components/item";
import MoveToTop from "@/components/moveToTop";
import PageState from "@/components/pageState";
import Seo from "@/components/seo";
import Title from "@/components/title";
import { useProjectPageStore } from "@/store/pageStore";
import axios from "axios";
import { BASE_URL, DATABASE_ID_PROJECT, TOKEN } from "libs/config";
import { useSortedData } from "libs/usePageState";
import { cls } from "libs/utils";
import { useEffect, useState } from "react";

export default function Project({ projects }: any) {
  const { viewStyle, sortedContent } = useProjectPageStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const [tagCategory, setTagCategory] = useState("all");
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
        <div className="lg:max-w-3xl w-full mx-auto">
          <Title
            title={"Projects"}
            subMent={"진행했던 프로젝트들을 기록합니다."}
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
                  className={cls(tagCategory === "all" ? "categoty-style" : "")}
                >
                  All({projects.results.length})
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
