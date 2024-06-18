import { cls } from 'libs/utils'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Highlight from 'react-highlight'
import { BlockContentType, RichText } from '@/InterfaceGather'

interface notionText {
  [key: string]: string
}

export default function PostDetailContent({ blockContent }: BlockContentType) {
  // code
  const codeTxt = blockContent.code?.rich_text[0]?.text?.content
  const codeLag = blockContent.code?.language

  // paragraph & heading_3 & bulleted_list_item
  const notionTxtColor = (colorName: string) => {
    const notionTextColorsList: notionText = {
      red: 'text-red-600 dark:text-red-700',
      red_background: 'bg-red-100 dark:bg-red-900',
      orange: 'text-orange-600 dark:text-orange-700',
      orange_background: 'bg-orange-100 dark:bg-orange-900',
      yellow: 'text-yellow-600 dark:text-yellow-700',
      yellow_background: 'bg-yellow-100 dark:bg-yellow-900',
      green: 'text-green-600 dark:text-green-700',
      green_background: 'bg-green-100 dark:bg-green-900',
      blue: 'text-blue-600 dark:text-blue-700',
      blue_background: 'bg-blue-100 dark:bg-blue-900',
      purple: 'text-purple-600 dark:text-purple-700',
      purple_background: 'bg-purple-100 dark:bg-purple-900',
      pink: 'text-pink-600 dark:text-pink-700',
      pink_background: 'bg-pink-100 dark:bg-pink-900',
      brown: 'text-[#c8a08d] dark:text-[#976954]',
      brown_background: 'bg-[#F4EEEE] dark:bg-[#68493b]',
      gray: 'text-gray-600 dark:text-gray-500',
      gray_background: 'bg-gray-200 dark:bg-gray-700',
    }

    return notionTextColorsList[colorName] || ''
  }

  const stylesMap: notionText = {
    bold: 'font-extrabold',
    italic: 'italic',
    strikethrough: 'line-through',
    underline: 'underline underline-offset-4',
    code: 'bg-[#f6f4ef] dark:bg-[#122c42] text-[#eb5757] px-1 rounded',
  }

  const getStyle = (styleName: string, value: string | boolean) =>
    value ? [stylesMap[styleName]] : []
  const colorStyle = (color: string) =>
    color !== 'default' ? [notionTxtColor(color)] : []

  const paragraphColor = colorStyle(blockContent.paragraph?.color ?? '')
  const textContent = blockContent[blockContent.type]?.rich_text || null

  const richTextContent = textContent?.map(
    (txtPiece: RichText, index: number) => {
      const textContent = txtPiece?.text?.content
      const textAnnotations = txtPiece?.annotations
      const textLink = txtPiece?.text?.link

      const textStyles = [
        ...getStyle('bold', textAnnotations?.bold),
        ...getStyle('italic', textAnnotations?.italic),
        ...getStyle('strikethrough', textAnnotations?.strikethrough),
        ...getStyle('underline', textAnnotations?.underline),
        ...getStyle('code', textAnnotations?.code),
        ...colorStyle(textAnnotations?.color),
      ].filter(Boolean)

      const finalTextStyle = textStyles.join(' ')

      return textLink !== null ? (
        <Link
          href={textContent}
          target="_blank"
          className="hover:text-[#2c82f2] underline"
        >
          {textContent}
        </Link>
      ) : (
        <span
          key={index}
          className={cls(
            'detail-paragraph',
            finalTextStyle,
            textContent === '참고'
              ? 'mt-6 pb-3 mb-4 font-bold text-sm block border-b border-stone-400'
              : '',
          )}
        >
          {textContent}
        </span>
      )
    },
  )

  // image
  const [scrennWidth, setScrennWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 })
  const handleResize = () => {
    setScrennWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const imageSizeStyles = {
    height:
      imageSize.height < 30
        ? 30
        : imageSize.height > 360
          ? 360
          : imageSize.height,
    width:
      imageSize.width > 768 || scrennWidth < 768 ? '100%' : imageSize.width,
  }

  // embed - codepen
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const codepenUrl = 'https://codepen.io'
  const codepenMyId = 'pminsun'
  const codepenId = blockContent.embed?.url?.split('/')[5].split('?')[0]

  // 각 블록 유형에 따라 내용을 렌더링
  switch (blockContent.type) {
    case 'paragraph':
      return (
        <>
          {richTextContent.length > 0 ? (
            <p
              key={blockContent.id}
              className={cls('text-sm leading-6', ...paragraphColor)}
            >
              {richTextContent}
            </p>
          ) : (
            <p className="py-3" />
          )}
        </>
      )
    case 'bulleted_list_item':
      return (
        <li
          key={blockContent.id}
          className={cls('pl-3 text-sm leading-6', ...paragraphColor)}
        >
          {richTextContent}
        </li>
      )
    case 'heading_3':
      return (
        <>
          <p
            key={blockContent.id}
            className={cls('text-lg pb-4 leading-6', ...paragraphColor)}
          >
            {richTextContent}
          </p>
        </>
      )
    case 'quote':
      return (
        <>
          <div
            key={blockContent.id}
            className={cls(
              'text-sm my-3 py-1 leading-6 relative flex items-center',
              ...paragraphColor,
            )}
          >
            <span className="absolute left-0 right-0 w-1 h-full bg-[#2c82f2b9]"></span>
            <p className="pl-5">{richTextContent}</p>
          </div>
        </>
      )
    case 'code':
      return (
        <pre
          key={blockContent.id}
          className="text-xs overflow-x-auto !text-[#4e5156] dark:!text-[#d6deeb] p-5 bg-[#f6f4ef] dark:bg-[#011627] md:text-sm my-4 border border-transparent rounded-lg dark:border-slate-600"
        >
          {codeLag === 'javascript' ? (
            <Highlight className="javascript">{codeTxt}</Highlight>
          ) : codeLag === 'css' ? (
            <Highlight className="css">{codeTxt}</Highlight>
          ) : (
            <Highlight className="html">{codeTxt}</Highlight>
          )}
        </pre>
      )
    case 'image':
      return (
        <div
          key={blockContent.id}
          style={imageSizeStyles}
          className="relative my-3"
        >
          {blockContent.image && (
            <Image
              src={blockContent.image.file.url}
              alt="image"
              fill
              priority
              sizes="100%"
              className={cls(
                'object-left-top',
                imageSize.height > 30 && imageSize.height < 360
                  ? 'object-fill'
                  : 'object-contain',
              )}
              onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                setImageSize({ width: naturalWidth, height: naturalHeight })
              }}
            />
          )}
        </div>
      )
    case 'video':
      return (
        <div
          key={blockContent.id}
          className="border border-gray-200 dark:border-gray-700"
        >
          {blockContent.video && (
            <video src={blockContent.video.file.url} autoPlay loop muted />
          )}
        </div>
      )
    case 'bookmark':
      return (
        <div key={blockContent.id} className="my-2 ">
          {blockContent.bookmark && (
            <Link
              href={blockContent.bookmark.url}
              target="_blank"
              className="text-sm text-[#2c82f2] font-bold break-all hover:underline decoration-[#2c82f2]"
            >
              {blockContent.bookmark.url}
            </Link>
          )}
        </div>
      ) //참고링크
    case 'embed':
      return (
        <div key={blockContent.id} className="my-2">
          {mounted && (
            <>
              <iframe
                height="350"
                className="w-full"
                title="videoTag"
                src={`${codepenUrl}/${codepenMyId}/embed/${codepenId}?default-tab=html%2Cresult`}
                loading="lazy"
              >
                <span>See the Pen</span>
                <Link href={`${codepenUrl}/${codepenMyId}/pen/${codepenId}`}>
                  videoTag
                </Link>
                <span>by pminsun</span> (
                <Link href={`${codepenUrl}/${codepenMyId}`}>@pminsun</Link>)
                <span>on</span>
                <Link href={codepenUrl}>CodePen</Link>.
              </iframe>
            </>
          )}
        </div>
      )
    default:
      return null // 다른 블록 유형은 무시
  }
}
