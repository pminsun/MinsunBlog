import { useBlogPageStore, useProjectPageStore } from "@/store/pageStore";
import { cls } from "libs/utils";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

interface PageStateType {
  path: string;
}

export default function PageState({ path }: PageStateType) {
  const getStore =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    path === "blogs" ? useBlogPageStore() : useProjectPageStore();
  const { viewStyle, sortedContent, setViewStyle, setSortedContent } = getStore;
  const [pageStateSelect, setPageStateSelect] = useState(false);
  console.log(pageStateSelect);

  return (
    <div className="relative">
      <div
        onClick={() => setPageStateSelect((prev) => !prev)}
        className="p-1 cursor-pointer group"
      >
        <HiDotsHorizontal className="text-xl group-hover:text-[#2c82f2]" />
      </div>
      <div
        className={cls(
          "absolute flex flex-col z-30 right-0 bg-slate-500 w-40 shadow-lg p-3 rounded-lg",
          pageStateSelect ? "block" : "hidden"
        )}
      >
        <div className="flex items-center h-14 mb-4">
          <div
            onClick={() => setViewStyle("gallery")}
            className="cursor-pointer w-1/2 h-full border border-black"
          >
            <span className="text-xs">갤러리</span>
          </div>
          <div
            onClick={() => setViewStyle("list")}
            className="cursor-pointer w-1/2 h-full border border-black"
          >
            <span className="text-xs">리스트</span>
          </div>
        </div>
        <div className="flex items-center h-14 mb-4">
          <div
            onClick={() => setSortedContent("latest")}
            className="cursor-pointer w-1/2 h-full border border-black"
          >
            <span className="text-xs">최신순</span>
          </div>
          <div
            onClick={() => setSortedContent("registration")}
            className="cursor-pointer w-1/2 h-full border border-black"
          >
            <span className="text-xs">등록일순</span>
          </div>
        </div>
      </div>
    </div>
  );
}
