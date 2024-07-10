import Image from 'next/image'
import Link from 'next/link'
import Tag from './tag'
import { PostDetailPropType } from '@/InterfaceGather'
import { HiExternalLink } from 'react-icons/hi'
import { blurDataURLColor, changeDateToDot, cloudfrontBaseUrl, korDate } from 'libs/utils'

export default function PostDetailProp(props: PostDetailPropType) {
  const { name, tags, github, description, createDate, imageUrl, awsImageName } = props

  return (
    <div className="post-detailProps-container">
      <div className="post-detailImg-container">
        {/* blog page */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="image"
            width={300}
            height={300}
            priority
            placeholder="blur"
            blurDataURL={blurDataURLColor}
            className="post-image-style"
          />
        )}
        {/* project page */}
        {awsImageName && (
          <Image
            src={`${cloudfrontBaseUrl}/images/${awsImageName}`}
            alt="image"
            width={300}
            height={300}
            priority
            placeholder="blur"
            blurDataURL={blurDataURLColor}
            className="post-image-style !object-top"
          />
        )}
        {/* 이미지 없을 경우 */}
        {!imageUrl && !awsImageName && <div className="post-noneimage-style" />}
      </div>
      {/* 이미지 위 어두운 레이아웃 */}
      <div className="post-image-blackLayout" />
      {/* prop 내용을 표시하는 부분  */}
      <div className="post-props absolute-center laptop-max-width">
        <h2>{name}</h2>
        <div className="tag-area prop-unit">
          <span>태그</span>
          <Tag tags={tags} />
        </div>
        <div className="prop-unit description-area">
          <span>상세설명</span>
          <span>{description}</span>
        </div>
        {github && (
          <div className="github-area prop-unit">
            <span>
              Github <HiExternalLink />
            </span>
            <Link href={github + ''} target="_blank" className="hover:underline">
              {github}
            </Link>
          </div>
        )}
        {createDate && (
          <div className="flex items-center date-area prop-unit">
            <span>작성일자</span>
            <span>{changeDateToDot(korDate(createDate))}</span>
          </div>
        )}
      </div>
    </div>
  )
}
