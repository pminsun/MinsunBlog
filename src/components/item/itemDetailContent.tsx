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
  const paragraphProp = blockContent.paragraph?.rich_text[0];
  const paragraph = blockContent.paragraph?.rich_text.map(
    (txtPiece: any) => txtPiece?.text?.content
  );

  const paragraphPropStyle = paragraphProp?.annotations;
  const codeTxt = blockContent.code?.rich_text[0]?.text?.content;
  const codeLag = blockContent.code?.language;

  // paragraph
  const notionTxtColor = (colorName: string) => {
    const notionTextColorsList: notionText = {
      red: "text-red-600 dark:text-red-700",
      red_background: "bg-red-600",
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

  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  // 각 블록 유형에 따라 내용을 렌더링
  switch (blockContent.type) {
    case "paragraph":
      return (
        <p
          key={blockContent.id}
          className={cls(
            "text-sm leading-6",
            finalNotionTextStyle,
            paragraph === "참고 링크" ? "mt-12" : ""
          )}
        >
          {paragraph}
        </p>
      );
    case "code":
      return (
        <pre
          key={blockContent.id}
          className="text-xs md:text-sm my-6 border border-transparent rounded-lg overflow-hidden dark:border-slate-600"
        >
          {codeLag === "javascript" ? (
            <code className="js">{codeTxt}</code>
          ) : (
            <code className="css">{codeTxt}</code>
          )}
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
