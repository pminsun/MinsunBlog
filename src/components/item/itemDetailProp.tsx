import Link from "next/link";
import Tag from "./tag";
import { HiExternalLink } from "react-icons/hi";
import { changeDate } from "libs/useChangeDate";
import Image from "next/image";

export default function ItemDetailProp({
  name,
  tags,
  github,
  description,
  date,
  startDate,
  endDate,
  coverImage,
}: any) {
  return (
    <div className="relative h-[300px] overflow-hidden mt-4 mb-8">
      <div className="absolute w-full h-full">
        <Image
          src={coverImage}
          alt="coverImage"
          width={300}
          height={300}
          className="w-full h-full object-cover object-center brightness-75"
        />
      </div>
      <div className="ItemDetailPropText absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:max-w-3xl w-full text-white">
        <h2 className="text-2xl font-semibold mb-7">{name}</h2>
        <div className="flex items-center mb-4">
          <span className="text-xs w-24 block itemDetail-prop">태그</span>
          <Tag tags={tags} />
        </div>
        <div className="flex items-center mb-3">
          <span className="text-xs w-24 min-w-[6rem] block itemDetail-prop">
            상세설명
          </span>
          <span className="text-xs itemDetail-prop">{description}</span>
        </div>
        {github && (
          <div className="flex items-center h-6 mt-3 mb-2">
            <span className="flex items-center gap-2 text-xs w-24 itemDetail-prop">
              Github <HiExternalLink />
            </span>
            <Link
              href={github + ""}
              target="_blank"
              className="text-xs dark:text-slate-400 hover:underline"
            >
              {github}
            </Link>
          </div>
        )}
        {endDate && startDate && (
          <div className="flex items-center">
            <span className="text-xs w-24 pt-1 block itemDetail-prop">
              WorkPeriod
            </span>
            <div className="text-xs pt-1">
              <span className="itemDetail-prop">
                {changeDate(startDate)} ~{" "}
              </span>
              <span className="itemDetail-prop"> {changeDate(endDate)}</span>
            </div>
          </div>
        )}
        {endDate == null && startDate && (
          <div className="flex items-center">
            <span className="text-xs w-24 pt-1 block itemDetail-prop">
              작성일자
            </span>
            <span className="text-xs pt-1 itemDetail-prop">
              {changeDate(startDate)}
            </span>
          </div>
        )}
        {date && (
          <div className="flex items-center">
            <span className="text-xs w-24 pt-1 block itemDetail-prop">
              작성일자
            </span>
            <span className="text-xs pt-1 itemDetail-prop">
              {changeDate(date)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
