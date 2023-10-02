import UseTagsColor from "libs/useTagsColor";
import { cls } from "libs/utils";

export default function Tag({ tags, viewStyle }: any) {
  return (
    <div className="flex gap-2">
      {viewStyle === "list" && tags.length > 1 ? (
        <div className="flex items-end gap-2 md:hidden">
          <span
            className={cls(
              UseTagsColor(tags[0].name),
              "p-1 rounded text-[10px]"
            )}
          >
            {tags[0].name}
          </span>
          <span className="text-[10px] text-gray-500">etc</span>
        </div>
      ) : null}
      {tags.map((tag: any) => (
        <span
          key={tag.id}
          className={cls(
            UseTagsColor(tag.name),
            "p-1 rounded text-[10px]",
            viewStyle === "list" && tags.length > 1
              ? "hidden md:inline-block"
              : ""
          )}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
