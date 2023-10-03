import { cls } from "libs/utils";
import Image from "next/image";
import Link from "next/link";

interface notionText {
  [key: string]: string;
}

export default function ItemDetailContent({ blockContent }: any) {
  const paragraphProp = blockContent.paragraph?.rich_text[0];
  const paragraphTxt = paragraphProp?.text?.content;
  const paragraphPropStyle = paragraphProp?.annotations;
  const codeTxt = blockContent.code?.rich_text[0]?.text?.content;

  // paragraph
  const notionTxtColor = (colorName: string) => {
    const notionTextColorsList: notionText = {
      red: "text-red-600 dark:text-red-700",
    };

    return notionTextColorsList[colorName] || "";
  };
  const stylesMap: notionText = {
    bold: "font-extrabold",
    italic: "italic",
    strikethrough: "line-through",
    underline: "underline underline-offset-4",
  };

  const getStyle = (styleName: string, value: any) =>
    value ? [stylesMap[styleName]] : [];
  const colorStyle = (color: string) =>
    color !== "default" ? [notionTxtColor(color)] : [];

  const notionTextStyle = [
    ...getStyle("bold", paragraphPropStyle?.bold),
    ...getStyle("italic", paragraphPropStyle?.italic),
    ...getStyle("strikethrough", paragraphPropStyle?.strikethrough),
    ...getStyle("underline", paragraphPropStyle?.underline),
    ...colorStyle(paragraphPropStyle?.color),
  ].filter(Boolean);

  const finalNotionTextStyle = notionTextStyle.join(" ");

  // 각 블록 유형에 따라 내용을 렌더링
  switch (blockContent.type) {
    case "paragraph":
      return (
        <p
          key={blockContent.id}
          className={cls(
            "text-sm leading-6",
            finalNotionTextStyle,
            paragraphTxt === "참고 링크" ? "mt-12" : ""
          )}
        >
          {paragraphTxt}
        </p>
      );
    case "code":
      return (
        <pre
          key={blockContent.id}
          className="bg-gray-200 dark:bg-gray-600 p-4 rounded text-xs md:text-sm my-4 whitespace-pre-wrap"
        >
          {codeTxt}
        </pre>
      );
    case "image":
      return (
        <div key={blockContent.id} className="relative h-32 md:h-56">
          <Image
            src={blockContent.image.file.url}
            alt="image"
            fill
            priority
            className="object-contain"
          />
        </div>
      );
    case "bookmark":
      return (
        <div key={blockContent.id} className="my-2 hover:underline">
          <Link
            href={blockContent.bookmark.url}
            className="text-sm dark:text-slate-400"
          >
            {blockContent.bookmark.url}
          </Link>
        </div>
      );
    default:
      return null; // 다른 블록 유형은 무시
  }
}
