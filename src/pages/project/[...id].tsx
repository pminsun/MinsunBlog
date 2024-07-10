/* eslint-disable react-hooks/rules-of-hooks */
import PostDetailContent from '@/components/post/postDetailContent'
import axios from 'axios'
import { useRouter } from 'next/router'
import { HiArrowLeft } from 'react-icons/hi'
import { NextPageContext } from 'next'
import UseProperties from 'libs/useProperties'
import { BASE_URL, TOKEN } from 'libs/config'
import PostDetailProp from '@/components/post/postDetailProp'
import Seo from '@/components/seo'
import MoveToTop from '@/components/ScreenElement/moveToTop'
import { BlockDetailData } from '@/InterfaceGather'

export default function blockDetail({
  blockDetail,
  propertiesData,
}: BlockDetailData) {
  const router = useRouter()
  const awsImage = router.query.img
  const backClick = () => {
    router.push('/project')
  }

  const itemData = UseProperties(propertiesData)

  return (
    <>
      <Seo
        title={itemData.name}
        url={BASE_URL + '/' + router.asPath}
        desc={itemData.description}
        image={propertiesData.cover?.external?.url}
      />
      <div className="backBtn-container laptop-max-width">
        <button onClick={backClick}>
          <HiArrowLeft />
        </button>
      </div>
      <PostDetailProp
        name={itemData.name}
        tags={itemData.tags}
        github={itemData.github}
        createDate={propertiesData.created_time}
        description={itemData.description}
        awsImageName={awsImage}
      />
      <div className="post-detailContent-container laptop-max-width">
        {blockDetail?.results?.map((blockContent: any) => (
          <PostDetailContent
            key={blockContent.id}
            blockContent={blockContent}
          />
        ))}
      </div>
      <MoveToTop />
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context
  const axiosConfig = {
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  }

  const resoinseBlock = await axios.get(
    `https://api.notion.com/v1/blocks/${query.id}/children`,
    axiosConfig,
  )

  const responseProperties = axios.get(
    `https://api.notion.com/v1/pages/${query.id}`,
    axiosConfig,
  )

  const [blockResponse, propertiesResponse] = await Promise.all([
    resoinseBlock,
    responseProperties,
  ])
  const blockDetail = blockResponse.data
  const propertiesData = propertiesResponse.data

  return {
    props: { blockDetail, propertiesData },
  }
}
