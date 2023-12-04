import ItemDetailContent from "@/components/item/itemDetailContent";
import axios from "axios";
import { useRouter } from "next/router";
import { HiArrowLeft } from "react-icons/hi";
import { NextPageContext } from "next";
import UseProperties from "libs/useProperties";
import { BASE_URL, TOKEN } from "libs/config";
import ItemDetailProp from "@/components/item/itemDetailProp";
import Seo from "@/components/seo";
import MoveToTop from "@/components/moveToTop";

export default function blockDetail({ blockDetail, propertiesData }: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const backClick = () => {
    router.push("/project");
  };

  const itemData = UseProperties(propertiesData);

  return (
    <>
      <Seo
        title={itemData.name}
        url={BASE_URL + "/" + router.asPath}
        desc={itemData.description}
        image={propertiesData.cover.external.url}
      />
      <div className="px-5 lg:px-0 lg:max-w-3xl lg:mx-auto">
        <button onClick={backClick} className="block p-1">
          <HiArrowLeft />
        </button>
      </div>
      <ItemDetailProp
        name={itemData.name}
        tags={itemData.tags}
        github={itemData.github}
        startDate={itemData.startDate}
        endDate={itemData.endDate}
        description={itemData.description}
        coverImage={itemData.coverImage}
      />
      <div className="px-5 lg:px-0 pb-10 lg:max-w-3xl w-full mx-auto">
        {blockDetail?.results?.map((blockContent: any) => (
          <ItemDetailContent
            key={blockContent.id}
            blockContent={blockContent}
          />
        ))}
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

  return {
    props: { blockDetail, propertiesData },
  };
}
