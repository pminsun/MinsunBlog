import Link from "next/link";
import Tag from "./tag";
import { HiExternalLink } from "react-icons/hi";
import { changeDate } from "libs/useChangeDate";
import Image from "next/image";
import { PostDetailPropType } from "@/InterfaceGather";

export default function PostDetailProp({
  name,
  tags,
  github,
  description,
  coverImage,
  createDate,
}: PostDetailPropType) {
  const create = new Date(createDate);
  const korDate = new Date(
    create.getTime() - create.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  return (
    <div className="relative h-[300px] overflow-hidden mt-4 mb-8">
      <div className="absolute w-full h-full">
        {coverImage ? (
          <Image
            src={coverImage}
            alt="coverImage"
            width={300}
            height={300}
            className="post-image-style"
          />
        ) : (
          <div className="post-noneimage-style" />
        )}
      </div>
      {/* image dark */}
      <div className="absolute w-full h-full bg-black/50" />
      {/* prop Content */}
      <div className="px-5 lg:px-0 ItemDetailPropText absolute-center laptop-max-width text-white">
        <h2 className="text-2xl font-semibold mb-7">{name}</h2>
        <div className="flex items-center mb-4">
          <span className="w-24 block itemDetail-prop">태그</span>
          <Tag tags={tags} />
        </div>
        <div className="flex items-center mb-3">
          <span className="w-24 min-w-[6rem] block itemDetail-prop">
            상세설명
          </span>
          <span className="itemDetail-prop">{description}</span>
        </div>
        {github && (
          <div className="flex items-center h-6 mt-3 mb-2">
            <span className="flex items-center gap-2 w-24 itemDetail-prop">
              Github <HiExternalLink />
            </span>
            <Link
              href={github + ""}
              target="_blank"
              className="itemDetail-prop hover:underline"
            >
              {github}
            </Link>
          </div>
        )}
        {createDate && (
          <div className="flex items-center">
            <span className="w-24 pt-1 block itemDetail-prop">작성일자</span>
            <span className="pt-1 itemDetail-prop">{changeDate(korDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
