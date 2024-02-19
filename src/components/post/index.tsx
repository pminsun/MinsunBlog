import UseProperties from "libs/useProperties";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Tag from "./tag";
import { changeDate } from "libs/useChangeDate";
import { cls } from "libs/utils";
import DEFINE from "@/constant/Global";
import { PostType, TagType } from "@/InterfaceGather";
import { useEffect, useState } from "react";

export default function Post({ item, viewStyle, tagCategory }: PostType) {
  const itemData = UseProperties(item);

  const router = useRouter();
  const pathName =
    router.pathname === "/project" ? `/project/${item.id}` : `/blog/${item.id}`;

  const create = new Date(item.created_time);
  const korDate = new Date(
    create.getTime() - create.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const tagName = itemData.tags.map((row: TagType) => row.name);

  const categoryView =
    tagCategory === DEFINE.TAGCATEGORY.ALL ||
    tagName.includes(tagCategory) ||
    (tagCategory === DEFINE.TAGCATEGORY.ETC &&
      [DEFINE.TAGCATEGORY.HTML, DEFINE.TAGCATEGORY.NEXTJS].some((excludedTag) =>
        tagName.includes(excludedTag)
      ));

  const blurDataURL =
    "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII=";

  // CoverImage
  const [coverUrl, setCoverUrl] = useState<string>("");

  const stringTag = tagName + "";
  // const matchCoverImage = () => {
  //   if (stringTag === "Next.js") {
  //     setCoverUrl("/coverImages/next-cover.png");
  //   } else if (stringTag === "Javascript") {
  //     setCoverUrl("/coverImages/javascript-cover.png");
  //   } else if (stringTag === "Html") {
  //     setCoverUrl("/coverImages/html-cover.png");
  //   } else if (stringTag === "Typescript") {
  //     setCoverUrl("/coverImages/typescript-cover.png");
  //   } else if (stringTag === "Emotion") {
  //     setCoverUrl("/coverImages/emotion-cover.png");
  //   } else {
  //     return <div className="post-noneimage-style" />;
  //   }
  // };

  // useEffect(() => {
  //   matchCoverImage();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      {viewStyle === "gallery" && categoryView && (
        <Link
          href={{ pathname: pathName }}
          key={item.id}
          className="h-[280px] post-link-style group"
        >
          <div className="post-gallery-image-container">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt="image"
                width={300}
                height={300}
                priority
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="post-image-style"
              />
            ) : itemData.url ? (
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
            ) : (
              <div className="post-noneimage-style" />
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
      {viewStyle === "list" && categoryView && (
        <Link
          href={{ pathname: pathName }}
          key={item.id}
          className="post-list-style post-link-style group"
        >
          <div className="post-list-image-container">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt="image"
                width={300}
                height={300}
                priority
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="post-image-style"
              />
            ) : (
              <div className="post-noneimage-style" />
            )}
          </div>
          <div className="flex h-full items-center ml-[calc(27%)] md:ml-[130px] z-20 w-[73%] md:w-[calc(100%-130px)]">
            <div className="w-2/3 md:w-full">
              <p className="post-name">
                {itemData.name.length > 40
                  ? itemData.name.slice(0, 39) + "..."
                  : itemData.name}
              </p>
              <span
                className={cls(
                  itemData.description.length > 45 ? "w-2/3" : "w-full",
                  "post-list-desc"
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
  );
}
