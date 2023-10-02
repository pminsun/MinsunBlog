import { useBlogPageStore, useProjectPageStore } from "@/store/pageStore";

interface PageStateType {
  path: string;
}

export default function PageState({ path }: PageStateType) {
  const getStore =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    path === "blogs" ? useBlogPageStore() : useProjectPageStore();
  const { viewStyle, sortedContent, setViewStyle, setSortedContent } = getStore;

  return (
    <div className="flex items-center gap-4">
      <select
        value={viewStyle}
        onChange={(e) => setViewStyle(e.target.value)}
        className="px-2 py-1 cursor-pointer"
      >
        <option value={"gallery"}>갤러리</option>
        <option value={"list"}>리스트</option>
      </select>
      <select
        value={sortedContent}
        onChange={(e) => setSortedContent(e.target.value)}
        className="px-2 py-1 cursor-pointer"
      >
        <option value={"latest"}>최신순</option>
        <option value={"registration"}>등록일순</option>
      </select>
    </div>
  );
}
