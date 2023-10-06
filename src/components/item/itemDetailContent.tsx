import { cls } from "libs/utils";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/night-owl.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", html);

interface notionText {
  [key: string]: string;
}

export default function ItemDetailContent({ blockContent }: any) {
  // code
  useEffect(() => {
    hljs.highlightAll();
    hljs.configure({ ignoreUnescapedHTML: true }); //코드 블록에서 이스케이프되지 않은 HTML에 대한 경고를 콘솔에 기록하지 않음
  }, []);

  const codeTxt = blockContent.code?.rich_text[0]?.text?.content;
  const codeLag = blockContent.code?.language;

  // paragraph
  const notionTxtColor = (colorName: string) => {
    const notionTextColorsList: notionText = {
      red: "text-red-600 dark:text-red-700",
      red_background: "bg-red-100 dark:bg-red-900",
      orange: "text-orange-600 dark:text-orange-700",
      orange_background: "bg-orange-100 dark:bg-orange-900",
      yellow: "text-yellow-600 dark:text-yellow-700",
      yellow_background: "bg-yellow-100 dark:bg-yellow-900",
      green: "text-green-600 dark:text-green-700",
      green_background: "bg-green-100 dark:bg-green-900",
      blue: "text-blue-600 dark:text-blue-700",
      blue_background: "bg-blue-100 dark:bg-blue-900",
      purple: "text-purple-600 dark:text-purple-700",
      purple_background: "bg-purple-100 dark:bg-purple-900",
      pink: "text-pink-600 dark:text-pink-700",
      pink_background: "bg-pink-100 dark:bg-pink-900",
      brown: "text-[#c8a08d] dark:text-[#976954]",
      brown_background: "bg-[#F4EEEE] dark:bg-[#68493b]",
      gray: "text-gray-600 dark:text-gray-500",
      gray_background: "bg-gray-200 dark:bg-gray-700",
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

  const paragraphColor = colorStyle(blockContent.paragraph?.color);

  const textContent =
    blockContent.type === "paragraph"
      ? blockContent.paragraph?.rich_text
      : blockContent.bulleted_list_item?.rich_text;

  const richTextContent = textContent?.map((txtPiece: any, index: number) => {
    const textContent = txtPiece?.text?.content;
    const textAnnotations = txtPiece?.annotations;

    const textStyles = [
      ...getStyle("bold", textAnnotations?.bold),
      ...getStyle("italic", textAnnotations?.italic),
      ...getStyle("strikethrough", textAnnotations?.strikethrough),
      ...getStyle("underline", textAnnotations?.underline),
      ...colorStyle(textAnnotations?.color),
    ].filter(Boolean);

    const finalTextStyle = textStyles.join(" ");

    return (
      <span key={index} className={cls("detail-paragraph", finalTextStyle)}>
        {textContent}
      </span>
    );
  });

  // 각 블록 유형에 따라 내용을 렌더링
  switch (blockContent.type) {
    case "paragraph":
      return (
        <>
          {richTextContent.length > 0 ? (
            <p
              key={blockContent.id}
              className={cls(
                "text-sm leading-6",
                ...paragraphColor,
                richTextContent.textContent === "참고 링크" ? "mt-12" : ""
              )}
            >
              {richTextContent}
            </p>
          ) : (
            <p className="py-3" />
          )}
        </>
      );
    case "bulleted_list_item":
      return (
        <li
          key={blockContent.id}
          className={cls("text-sm leading-6", ...paragraphColor)}
        >
          {richTextContent}
        </li>
      );
    case "code":
      return (
        <pre
          key={blockContent.id}
          className="text-xs md:text-sm my-2 border border-transparent rounded-lg overflow-hidden dark:border-slate-600"
        >
          {codeLag === "javascript" ? (
            <code className="js code-color">{codeTxt}</code>
          ) : (
            <code className="css code-color">{codeTxt}</code>
          )}
        </pre>
      );
    case "image":
      return (
        <div key={blockContent.id} className="relative h-32 md:h-56 my-2">
          <Image
            src={blockContent.image.file.url}
            alt="image"
            fill
            priority
            sizes="100%"
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
