/* eslint-disable react-hooks/rules-of-hooks */
import PostDetailContent from "@/components/post/postDetailContent";
import axios from "axios";
import { useRouter } from "next/router";
import {
  HiArrowLeft,
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";
import { NextPageContext } from "next";
import UseProperties from "libs/useProperties";
import { BASE_URL, TOKEN } from "libs/config";
import PostDetailProp from "@/components/post/postDetailProp";
import Seo from "@/components/seo";
import MoveToTop from "@/components/ScreenElement/moveToTop";
import Link from "next/link";
import {
  BlockDetailData,
  BlockDetailResults,
  TableData,
  TableResults,
} from "@/InterfaceGather";

export default function blockDetail({
  blockDetail,
  propertiesData,
  tableData,
}: BlockDetailData) {
  const router = useRouter();
  const backClick = () => {
    router.push("/blog");
  };

  const itemData = UseProperties(propertiesData);

  // 이전, 다음 글
  const pageInfo = (cell: { plain_text: string; href: string }) => {
    return { title: cell.plain_text, href: cell.href };
  };

  const pageInfoAll = (tableData: TableData, index: number) =>
    tableData.results
      .flatMap((table: TableResults) => table.table_row?.cells[index])
      .map(pageInfo)
      .map((item) => ({ title: item.title, href: item.href }));

  const preData = pageInfoAll(tableData!, 0);
  const nextData = pageInfoAll(tableData!, 1);

  const extractHrefID = (href: string) =>
    href?.substring(href.lastIndexOf("-") + 1 || href.lastIndexOf("/") + 1);

  // title & url
  const preTitle = preData[0]?.title;
  const nextTitle = nextData[0]?.title;
  const preHref = extractHrefID(preData[0]?.href);
  const nextHref = extractHrefID(nextData[0]?.href);

  return (
    <>
      <Seo
        title={itemData.name}
        url={BASE_URL + "/" + router.asPath}
        desc={itemData.description}
        image={
          propertiesData.cover?.external?.url || propertiesData.cover?.file?.url
        }
      />
      <div className="px-5 lg:px-0 laptop-max-width">
        <button onClick={backClick} className="block p-1">
          <HiArrowLeft />
        </button>
      </div>
      <PostDetailProp
        name={itemData.name}
        tags={itemData.tags}
        github={itemData.github}
        createDate={propertiesData.created_time}
        description={itemData.description}
        coverImage={itemData.coverImage}
      />
      <div className="px-5 lg:px-0 pb-10 laptop-max-width">
        {blockDetail?.results?.map((blockContent: any) => (
          <PostDetailContent
            key={blockContent.id}
            blockContent={blockContent}
          />
        ))}
      </div>
      <div className="px-5 lg:px-0 laptop-max-width flex items-center flex-col md:flex-row gap-4 md:gap-0 justify-between py-12 md:py-16 text-xs border-t-4 border-stone-200 border-dotted dark:border-stone-500">
        {preHref && (
          <Link
            href={`/blog/${preHref}`}
            className="bg-gray-100 overflow-hidden dark:bg-gray-800 w-full md:w-auto rounded flex items-center px-2 py-3 group"
          >
            <HiOutlineArrowCircleLeft className="text-2xl text-gray-400 group-hover:text-[#2c82f2] mt-1" />
            <div className="ml-4">
              <p className="text-[10px] mb-1">이전 포스트</p>
              <p className="font-bold md:w-48 whitespace-nowrap overflow-hidden text-ellipsis">
                {preTitle.length > 30
                  ? preTitle.slice(0, 30) + "..."
                  : preTitle}
              </p>
            </div>
          </Link>
        )}
        {nextHref && (
          <Link
            href={`/blog/${nextHref}`}
            className="flex items-center overflow-hidden justify-end w-full md:w-auto bg-gray-100 dark:bg-gray-800 rounded px-4 py-3 ml-auto group"
          >
            <div className="mr-4 flex flex-col items-end">
              <p className="text-[10px] mb-1">다음 포스트</p>
              <p className="font-bold md:w-48 whitespace-nowrap overflow-hidden text-ellipsis text-right">
                {nextTitle.length > 30
                  ? nextTitle.slice(0, 30) + "..."
                  : nextTitle}
              </p>
            </div>
            <HiOutlineArrowCircleRight className="text-2xl text-gray-400 group-hover:text-[#2c82f2] mt-1" />
          </Link>
        )}
      </div>
      <MoveToTop />
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  const axiosConfig = {
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const resoinseBlock = await axios.get(
    `https://api.notion.com/v1/blocks/${query.id}/children`,
    axiosConfig
  );

  const responseProperties = axios.get(
    `https://api.notion.com/v1/pages/${query.id}`,
    axiosConfig
  );

  const [blockResponse, propertiesResponse] = await Promise.all([
    resoinseBlock,
    responseProperties,
  ]);
  const blockDetail = blockResponse.data;
  const propertiesData = propertiesResponse.data;

  // table id 추출
  let tableId = null;
  blockDetail.results.map(
    (blockContent: BlockDetailResults) =>
      blockContent.type === "table" && (tableId = blockContent.id)
  );

  // table_row data
  let tableData = null;
  if (tableId) {
    const tableResponse = await axios.get(
      `https://api.notion.com/v1/blocks/${tableId}/children`,
      axiosConfig
    );
    tableData = tableResponse.data;
  }

  return {
    props: { blockDetail, propertiesData, tableData },
  };
}
