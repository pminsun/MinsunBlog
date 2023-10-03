/* eslint-disable react-hooks/rules-of-hooks */
import Item from "@/components/item";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Seo
        title={`MinSun's Blog | Projects`}
        url={BASE_URL + "/project"}
        desc={"진행했던 프로젝트들을 기록합니다."}
      />
      {mounted && (
        <>
          <Title
            title={"Projects"}
            subMent={"진행했던 프로젝트들을 기록합니다."}
          />
          <div className="pb-8">
            <div className="page-state-style">
              <p>All ({projects.results.length})</p>
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
                projects.results.map((item: any) => (
                  <Item key={item.id} item={item} viewStyle={viewStyle} />
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
    `https://api.notion.com/v1/databases/${DATABASE_ID_PROJECT}/query`,
    data,
    axiosConfig
  );

  const projects = response.data;
  return {
    props: { projects },
  };
}
