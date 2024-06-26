import UseProperties from 'libs/useProperties'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Tag from './tag'
import { changeDate } from 'libs/useChangeDate'
import { cls } from 'libs/utils'
import DEFINE from '@/constant/Global'
import { PostType, TagType } from '@/InterfaceGather'

export default function Post({
  item,
  viewStyle,
  tagCategory,
  awsImages,
}: PostType) {
  const itemData = UseProperties(item)

  //aws s3 image
  const cloudfrontBaseUrl = 'https://dxf0ufub2j2u1.cloudfront.net'

  const router = useRouter()
  const pathName =
    router.pathname === '/project' ? `/project/${item.id}` : `/blog/${item.id}`
  const queryValue = router.pathname === '/project' ? { img: awsImages } : null

  const create = new Date(item.created_time)
  const korDate = new Date(
    create.getTime() - create.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split('T')[0]

  const tagName = itemData.tags.map((row: TagType) => row.name)

  const categoryView =
    tagCategory === DEFINE.TAGCATEGORY.ALL ||
    tagName.includes(tagCategory) ||
    (tagCategory === DEFINE.TAGCATEGORY.ETC &&
      [DEFINE.TAGCATEGORY.HTML, DEFINE.TAGCATEGORY.NEXTJS].some((excludedTag) =>
        tagName.includes(excludedTag),
      ))

  const blurDataURL =
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII='

  return (
    <>
      {viewStyle === 'gallery' && categoryView && (
        <Link
          href={{ pathname: pathName, query: queryValue }}
          key={item.id}
          className="h-[280px] post-link-style group"
        >
          <div className="post-gallery-image-container">
            {itemData.url && (
              <Image
                src={itemData.url}
                alt="image"
                width={300}
                height={300}
                priority
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="post-image-style"
              />
            )}
            {!itemData.url &&
              item.id !== '12e40e01-8c7c-457e-bada-784889fbe08a' &&
              item.id !== '49b53229-e993-4e98-ad6d-74687ad9364a' && (
                <div className="post-noneimage-style" />
              )}
            {!itemData.url && router.pathname === '/project' && awsImages && (
              <Image
                src={`${cloudfrontBaseUrl}/images/${awsImages}`}
                alt="image"
                width={300}
                height={300}
                priority
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="post-image-style"
              />
            )}
          </div>
          <div className="p-4 absolute bottom-0 w-full">
            <p className="post-name">{itemData.name}</p>
            <p className="post-gallery-desc">{itemData.description}</p>
            {item.created_time && (
              <p className="post-gallery-createdTime">{changeDate(korDate)}</p>
            )}
            <Tag tags={itemData.tags} viewStyle={viewStyle} />
          </div>
        </Link>
      )}
      {viewStyle === 'list' && categoryView && (
        <Link
          href={{ pathname: pathName }}
          key={item.id}
          className="post-list-style post-link-style group"
        >
          <div className="post-list-image-container">
            {itemData.url && (
              <Image
                src={itemData.url}
                alt="image"
                width={300}
                height={300}
                priority
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="post-image-style"
              />
            )}
            {!itemData.url &&
              item.id !== '12e40e01-8c7c-457e-bada-784889fbe08a' &&
              item.id !== '49b53229-e993-4e98-ad6d-74687ad9364a' && (
                <div className="post-noneimage-style" />
              )}

            {!itemData.url && router.pathname === '/project' && (
              <Image
                src={`${cloudfrontBaseUrl}/images/${awsImages}`}
                alt="image"
                width={300}
                height={300}
                priority
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="post-image-style"
              />
            )}
          </div>
          <div className="flex h-full items-center ml-[calc(27%)] md:ml-[130px] z-20 w-[73%] md:w-[calc(100%-130px)]">
            <div className="w-2/3 md:w-full">
              <p className="post-name">
                {itemData.name.length > 40
                  ? itemData.name.slice(0, 39) + '...'
                  : itemData.name}
              </p>
              <span
                className={cls(
                  itemData.description.length > 45 ? 'w-2/3' : 'w-full',
                  'post-list-desc',
                )}
              >
                {itemData.description}
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-end md:items-center gap-3 z-20 absolute right-4">
            <Tag
              tags={itemData.tags}
              viewStyle={viewStyle}
              tagCategory={tagCategory}
            />
            <span className="hidden md:inline-block page-text-group-hover-effect page-text-group-hover-Anieffect-1000">
              |
            </span>
            {item.created_time && (
              <span className="post-list-createdTime">
                {changeDate(item.created_time)}
              </span>
            )}
          </div>
        </Link>
      )}
    </>
  )
}
