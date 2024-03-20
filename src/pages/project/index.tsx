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
import { PiWarningCircle } from "react-icons/pi";
import { AWS_KEY, AWS_REG, AWS_SECRET_KEY } from "libs/config";
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

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
    setFilteredList(projects);
  }, [projects]);

  // Paging
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * 9;
  const indexOfFirst = indexOfLast - 9;

  const handleSearchInputChange = (searchWord: string) => {
    setSearch(searchWord);

    let updatedList = projects;
    updatedList = projects.filter((item: ListResults) => {
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

  //aws s3 image
  const credentials = {
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  };

  const s3Client = new S3Client({
    region: AWS_REG,
    credentials: credentials,
  });

  const bucketName = "s3.personalblog";
  const folderPrefixImages = "images/";
  const [awsImages, setAwsImages] = useState<string[] | null>(null);
  const getObjectsInFolder = async () => {
    try {
      // 폴더 내 객체 목록을 가져오는 요청 설정
      const commandInput = {
        Bucket: bucketName,
        Prefix: folderPrefixImages,
      };
      const command = new ListObjectsV2Command(commandInput);

      // S3 클라이언트를 사용하여 폴더 내 객체 목록을 가져옴
      const data = await s3Client.send(command);

      let objectlists = [];
      for (let object of data.Contents) {
        // 폴더 객체인 경우 리스트에 추가하지 않음
        if (!object.Key.endsWith("/")) {
          objectlists.push(object.Key);
        }
      }

      return objectlists;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const res = await getObjectsInFolder();
        if (res) {
          const removeFolder = res.map((r: string) => r.split("/")[1]);
          setAwsImages(removeFolder);
        }
      } catch (error) {
        console.error("Error fetching objects:", error);
      }
    };

    fetchObjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  {DEFINE.TAGCATEGORY.ALL}({projects.length})
                </li>
              </ul>
              <PageState path={"projects"} />
            </div>
            {filteredList.length === 0 && (
              <div className="w-full flex-center gap-2 post-link-style !cursor-default p-4">
                <PiWarningCircle className="text-black dark:text-slate-400 text-xl" />
                <p>검색결과가 없습니다.</p>
              </div>
            )}
            <div
              className={cls(
                viewStyle === "gallery"
                  ? "page-gallery-style grid-rows-3"
                  : "page-list-style",
                "w-full min-h-[912px] lg:min-h-[904px]"
              )}
            >
              {useSortedData(
                filteredList.map((item: ListResults) => (
                  <Post
                    key={item.id}
                    item={item}
                    viewStyle={viewStyle}
                    tagCategory={tagCategory}
                    awsImages={awsImages}
                  />
                )),
                sortedContent
              ).slice(indexOfFirst, indexOfLast)}
            </div>
          </div>
          <MoveToTop />
          <Pagination
            postsPerPage={9}
            totalPosts={projects?.length || 0}
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

  const projects = response.data.results;
  return {
    props: { projects },
  };
}
