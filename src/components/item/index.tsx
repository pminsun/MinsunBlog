import UseProperties from "libs/useProperties";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Tag from "./tag";
import { changeDate } from "libs/useChangeDate";
import { cls } from "libs/utils";

export default function Item({ item, viewStyle, tagCategory }: any) {
  const itemData = UseProperties(item);

  const router = useRouter();
  const pathName =
    router.pathname === "/blog" ? `/blog/${item.id}` : `/project/${item.id}`;

  const tagName = itemData.tags.map((row: any) => row.name);

  return (
    <>
      {viewStyle === "gallery" &&
        (tagCategory === "all" ||
          tagName.includes(tagCategory) ||
          (tagCategory === "Etc" &&
            !["Dev", "React", "Emotion", "Javascript", "Css"].some(
              (excludedTag) => tagName.includes(excludedTag)
            ))) && (
          <Link
            href={{ pathname: pathName }}
            key={item.id}
            className="h-[280px] item-link-style group relative"
          >
            <div className="w-full h-1/2 top-0 group-hover:h-full page-image-group-hover-effect">
              {item.cover ? (
                <Image
                  src={item.cover?.external.url || item.cover?.file?.url}
                  alt="image"
                  width={300}
                  height={300}
                  priority
                  className="page-image-style"
                />
              ) : (
                <div className="page-noneimage-style" />
              )}
            </div>
            <div className="p-4 absolute bottom-0">
              <p className="dark:text-slate-200 font-semibold page-text-group-hover-effect">
                {itemData.name}
              </p>
              <p className="mt-3 page-text-group-hover-effect page-text-group-hover-Anieffect-500">
                {itemData.description.length > 26
                  ? itemData.description.slice(0, 25) + "....."
                  : itemData.description}
              </p>
              {itemData.date && (
                <p className="my-2 page-text-group-hover-effect page-text-group-hover-Anieffect-500">
                  {changeDate(itemData.date)}
                </p>
              )}
              {itemData.endDate && itemData.startDate && (
                <p className="my-2 page-text-group-hover-effect page-text-group-hover-Anieffect-500">
                  {changeDate(itemData.startDate)}~
                  {changeDate(itemData.endDate) || null}
                </p>
              )}
              {itemData.endDate == null && itemData.startDate && (
                <p className="my-2 page-text-group-hover-effect page-text-group-hover-Anieffect-500">
                  {changeDate(itemData.startDate)}
                </p>
              )}
              <Tag tags={itemData.tags} viewStyle={viewStyle} />
            </div>
          </Link>
        )}
      {viewStyle === "list" &&
        (tagCategory === "all" ||
          tagName.includes(tagCategory) ||
          (tagCategory === "Etc" &&
            !["Dev", "React", "Emotion", "Javascript", "Css"].some(
              (excludedTag) => tagName.includes(excludedTag)
            ))) && (
          <Link
            href={{ pathname: pathName }}
            key={item.id}
            className="flex items-center justify-between pr-4 h-20 md:h-24 group item-link-style relative group"
          >
            <div className="w-[22%] md:w-[110px] h-full left-0 page-image-group-hover-effect group-hover:w-[100%]">
              {item.cover ? (
                <Image
                  src={item.cover?.external.url || item.cover?.file?.url}
                  alt="image"
                  width={300}
                  height={300}
                  priority
                  className="page-image-style"
                />
              ) : (
                <div className="page-noneimage-style " />
              )}
            </div>
            <div className="flex h-full items-center ml-[calc(27%)] md:ml-[130px] z-20">
              <div>
                <p className="dark:text-slate-200 font-semibold page-text-group-hover-effect">
                  {itemData.name}
                </p>
                <span
                  className={cls(
                    itemData.description.length > 45 ? "w-2/3" : "w-full",
                    "text-xs hidden md:block md:mt-1 page-text-group-hover-effect"
                  )}
                >
                  {itemData.description}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-end md:items-center gap-3 z-20">
              <Tag tags={itemData.tags} viewStyle={viewStyle} />
              <span className="hidden md:inline-block page-text-group-hover-effect page-text-group-hover-Anieffect-1000">
                |
              </span>
              {itemData.date && (
                <span className="page-text-group-hover-effect page-text-group-hover-Anieffect-1000">
                  {changeDate(itemData.date)}
                </span>
              )}
              {itemData.endDate && itemData.startDate && (
                <span className="page-text-group-hover-effect page-text-group-hover-Anieffect-1000">
                  {changeDate(itemData.startDate)}~
                  {changeDate(itemData.endDate.slice(-5)) || null}
                </span>
              )}
              {itemData.endDate == null && itemData.startDate && (
                <span className="page-text-group-hover-effect page-text-group-hover-Anieffect-1000">
                  {changeDate(itemData.startDate)}
                </span>
              )}
            </div>
          </Link>
        )}
    </>
  );
}
