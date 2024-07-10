import Link from 'next/link'
import Tag from './tag'
import { HiExternalLink } from 'react-icons/hi'
import { changeDate } from 'libs/useChangeDate'
import Image from 'next/image'
import { PostDetailPropType, TagType } from '@/InterfaceGather'
import { useRouter } from 'next/router'

export default function PostDetailProp({
  name,
  tags,
  github,
  description,
  createDate,
  imageUrl,
  awsImageName,
}: PostDetailPropType) {
  const router = useRouter()
  const create = new Date(createDate)
  const korDate = new Date(
    create.getTime() - create.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split('T')[0]

  const blurDataURL =
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII='

  const cloudfrontBaseUrl = 'https://dxf0ufub2j2u1.cloudfront.net'

  return (
    <div className="post-detailProps-container">
      <div className="post-detailImg-container">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="image"
            width={300}
            height={300}
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="post-image-style"
          />
        )}
        {!imageUrl && !awsImageName && <div className="post-noneimage-style" />}
        {awsImageName && (
          <Image
            src={`${cloudfrontBaseUrl}/images/${awsImageName}`}
            alt="image"
            width={300}
            height={300}
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="post-image-style !object-top"
          />
        )}
      </div>
      {/* image dark */}
      <div className="post-image-blackLayout" />
      {/* prop Content */}
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
            <Link
              href={github + ''}
              target="_blank"
              className="hover:underline"
            >
              {github}
            </Link>
          </div>
        )}
        {createDate && (
          <div className="flex items-center date-area prop-unit">
            <span>작성일자</span>
            <span>{changeDate(korDate)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
