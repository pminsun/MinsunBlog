import Item from "@/components/item";
import Title from "../../components/title";
import axios from "axios";
import { cls } from "libs/utils";
import { BASE_URL, DATABASE_ID_BLOG, TOKEN } from "libs/config";
import { useSortedData } from "libs/usePageState";
import PageState from "@/components/pageState";
import { useBlogPageStore } from "@/store/pageStore";
import Seo from "@/components/seo";

export default function Blog({ blogs }: any) {
  const { viewStyle, sortedContent } = useBlogPageStore();

  return (
    <>
      <Seo
        title="Blog"
        url={BASE_URL + "/blog"}
        desc={"개발하면서 탐구한 것을 기록합니다."}
      />
      <Title title={"Blog"} subMent={"개발하면서 탐구한 것을 기록합니다."} />
      <div className="pb-8">
        <div className="page-state-style">
          <p>All ({blogs.results.length})</p>
          <PageState path={"blogs"} />
        </div>
        <div
          className={cls(
            viewStyle === "gallery" ? "page-gallery-style" : "page-list-style",
            "w-full"
          )}
        >
          {useSortedData(
            blogs.results.map((item: any) => (
              <Item key={item.id} item={item} viewStyle={viewStyle} />
            )),
            sortedContent
          )}
        </div>
      </div>
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
