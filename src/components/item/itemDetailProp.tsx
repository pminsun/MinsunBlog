import Link from "next/link";
import Tag from "./tag";
import { HiExternalLink } from "react-icons/hi";
import { changeDate } from "libs/useChangeDate";

export default function ItemDetailProp({
  name,
  tags,
  github,
  date,
  startDate,
  endDate,
}: any) {
  return (
    <div className="mt-4 mb-8 pb-8 border-b-4 border-stone-200 border-dotted dark:border-stone-500">
      <h2 className="text-2xl font-semibold mb-7">{name}</h2>
      <div className="flex items-center mb-2">
        <span className="text-xs w-24 block">태그</span>
        <Tag tags={tags} />
      </div>
      {github && (
        <div className="flex items-center h-6 mt-4 mb-2">
          <span className="flex items-center gap-2 text-xs w-24">
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
          <span className="text-xs w-24 pt-1 block">WorkPeriod</span>
          <div className="text-xs pt-1">
            <span>{changeDate(startDate)} ~ </span>
            <span> {changeDate(endDate)}</span>
          </div>
        </div>
      )}
      {endDate == null && startDate && (
        <div className="flex items-center">
          <span className="text-xs w-24 pt-1 block">작성일자</span>
          <span className="text-xs pt-1">{changeDate(startDate)}</span>
        </div>
      )}
      {date && (
        <div className="flex items-center">
          <span className="text-xs w-24 pt-1 block">작성일자</span>
          <span className="text-xs pt-1">{changeDate(date)}</span>
        </div>
      )}
    </div>
  );
}
