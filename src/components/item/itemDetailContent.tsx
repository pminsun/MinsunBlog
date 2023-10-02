import Image from "next/image";

export default function ItemDetailContent({ blockContent }: any) {
  // 각 블록 유형에 따라 내용을 렌더링
  switch (blockContent.type) {
    case "paragraph":
      return (
        <p key={blockContent.id} className="text-sm leading-6">
          {blockContent.paragraph.rich_text[0]?.text?.content}
        </p>
      );
    case "code":
      return (
        <pre
          key={blockContent.id}
          className="bg-gray-200 dark:bg-gray-600 p-4 rounded text-sm my-3"
        >
          {blockContent.code.rich_text[0].text.content}
        </pre>
      );
    case "image":
      return (
        <div key={blockContent.id} className="relative h-80">
          <Image
            src={blockContent.image.file.url}
            alt="image"
            width={300}
            height={300}
            priority
            className="object-contain"
          />
        </div>
      );
    default:
      return null; // 다른 블록 유형은 무시
  }
}
