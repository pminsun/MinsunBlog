import { useBlogPageStore, useProjectPageStore } from "@/store/pageStore";
import { cls } from "libs/utils";
import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal, HiViewGrid, HiViewBoards } from "react-icons/hi";
import {
  BsGrid,
  BsListUl,
  BsSortNumericDownAlt,
  BsSortNumericUp,
} from "react-icons/bs";

interface PageStateType {
  path: string;
}

export default function PageState({ path }: PageStateType) {
  const getStore =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    path === "blogs" ? useBlogPageStore() : useProjectPageStore();
  const { viewStyle, sortedContent, setViewStyle, setSortedContent } = getStore;
  const [pageStateSelect, setPageStateSelect] = useState(false);

  const dropPageStateMenuBtnRef = useRef<HTMLDivElement | null>(null);
  const dropPageStateMenuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutsideClose = (e: { target: any }) => {
      if (
        pageStateSelect &&
        !dropPageStateMenuBtnRef.current?.contains(e.target) &&
        !dropPageStateMenuRef.current?.contains(e.target)
      )
        setPageStateSelect(false);
    };
    document.addEventListener("click", handleClickOutsideClose);

    return () => document.removeEventListener("click", handleClickOutsideClose);
  }, [pageStateSelect]);

  return (
    <div className="relative">
      <div
        ref={dropPageStateMenuBtnRef}
        onClick={() => setPageStateSelect((prev) => !prev)}
        className="p-1 cursor-pointer group bg-gray-100 rounded dark:bg-slate-800"
      >
        <HiDotsHorizontal
          className={cls(
            "text-base group-hover:text-[#2c82f2]",
            pageStateSelect
              ? "text-[#2c82f2]"
              : "text-black dark:text-slate-400"
          )}
        />
      </div>
      <div
        ref={dropPageStateMenuRef}
        className={cls(
          "absolute flex flex-col justify-between gap-4 z-30 top-8 right-0 bg-white dark:bg-slate-800 w-40 drop-shadow-xl p-3 rounded-lg",
          pageStateSelect ? "block" : "hidden"
        )}
      >
        <div>
          <p className="text-[10px] mb-2 relative after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-[84px] after:bg-gray-200 after:dark:bg-gray-600">
            레이아웃
          </p>
          <div className="flex items-center gap-2 h-14">
            <div
              onClick={() => setViewStyle("gallery")}
              className="cursor-pointer flex items-center justify-center flex-col gap-1 w-1/2 h-full rounded-md bg-gray-100 dark:bg-slate-700"
            >
              <BsGrid
                className={cls(
                  "text-lg",
                  viewStyle === "gallery" ? "text-[#2c82f2]" : "text-black"
                )}
              />
              <span
                className={cls(
                  "text-[10px]",
                  viewStyle === "gallery" ? "!text-[#2c82f2]" : "text-black"
                )}
              >
                갤러리
              </span>
            </div>
            <div
              onClick={() => setViewStyle("list")}
              className="cursor-pointer flex items-center justify-center flex-col gap-1 w-1/2 h-full rounded-md bg-gray-100 dark:bg-slate-700"
            >
              <BsListUl
                className={cls(
                  "text-lg",
                  viewStyle === "list" ? "text-[#2c82f2]" : "text-black"
                )}
              />
              <span
                className={cls(
                  "text-[10px]",
                  viewStyle === "list" ? "!text-[#2c82f2]" : "text-black"
                )}
              >
                리스트
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[10px] mb-2 relative after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-[104px] after:bg-gray-200 after:dark:bg-gray-600">
            정렬
          </p>
          <div className="flex items-center gap-2 h-14">
            <div
              onClick={() => setSortedContent("latest")}
              className="cursor-pointer flex items-center justify-center flex-col gap-1 w-1/2 h-full rounded-md bg-gray-100 dark:bg-slate-700"
            >
              <BsSortNumericDownAlt
                className={cls(
                  "text-lg",
                  sortedContent === "latest" ? "text-[#2c82f2]" : "text-black"
                )}
              />
              <span
                className={cls(
                  "text-[10px]",
                  sortedContent === "latest" ? "!text-[#2c82f2]" : "text-black"
                )}
              >
                최신순
              </span>
            </div>
            <div
              onClick={() => setSortedContent("registration")}
              className="cursor-pointer flex items-center justify-center flex-col gap-1 w-1/2 h-full rounded-md bg-gray-100 dark:bg-slate-700"
            >
              <BsSortNumericUp
                className={cls(
                  "text-lg",
                  sortedContent === "registration"
                    ? "text-[#2c82f2]"
                    : "text-black"
                )}
              />
              <span
                className={cls(
                  "text-[10px]",
                  sortedContent === "registration"
                    ? "!text-[#2c82f2]"
                    : "text-black"
                )}
              >
                등록일순
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
