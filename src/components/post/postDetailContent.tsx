import { cls, notionTxtColor, stylesMap } from 'libs/utils'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Highlight from 'react-highlight'
import { BlockContentType, RichText } from '@/InterfaceGather'

export default function PostDetailContent({ blockContent }: BlockContentType) {
  // 화면 너비와 이미지 크기를 상태로 관리
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 })
  const [mounted, setMounted] = useState(false)

  // 화면 크기 조절 이벤트
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // 스타일 매핑
  const getStyle = (styleName: string, value: string | boolean) =>
    value ? [stylesMap[styleName]] : []
  const colorStyle = (color: string) => (color !== 'default' ? [notionTxtColor(color)] : [])

  // 블록 내용의 색상 스타일 설정
  const paragraphColor = colorStyle(blockContent.paragraph?.color ?? '')
  const textContent = blockContent[blockContent.type]?.rich_text || null

  // Rich Text 내용 렌더링
  const richTextContent = textContent?.map((txtPiece: RichText, index: number) => {
    const { content } = txtPiece?.text || {}
    const textAnnotations = txtPiece?.annotations || {}
    const textLink = txtPiece?.text?.link

    const textStyles = [
      ...getStyle('bold', textAnnotations.bold),
      ...getStyle('italic', textAnnotations.italic),
      ...getStyle('strikethrough', textAnnotations.strikethrough),
      ...getStyle('underline', textAnnotations.underline),
      ...getStyle('code', textAnnotations.code),
      ...colorStyle(textAnnotations.color),
    ]
      .filter(Boolean)
      .join(' ')

    return textLink ? (
      <Link key={index} href={content} target="_blank" className="hover:text-[#2c82f2] underline">
        {content}
      </Link>
    ) : (
      <span
        key={index}
        className={cls(
          'detail-paragraph',
          textStyles,
          content === '참고'
            ? 'mt-6 pb-3 mb-4 font-bold text-sm block border-b border-stone-400'
            : '',
        )}
      >
        {content}
      </span>
    )
  })

  // 각 블록 유형에 따라 내용을 렌더링
  switch (blockContent.type) {
    case 'paragraph':
      return (
        <>
          {richTextContent.length > 0 ? (
            <p key={blockContent.id} className={cls('text-sm leading-6', ...paragraphColor)}>
              {richTextContent}
            </p>
          ) : (
            <p className="py-3" />
          )}
        </>
      )
    case 'bulleted_list_item':
      return (
        <li key={blockContent.id} className={cls('pl-3 text-sm leading-6', ...paragraphColor)}>
          {richTextContent}
        </li>
      )
    case 'heading_3':
      return (
        <>
          <p key={blockContent.id} className={cls('text-lg pb-4 leading-6', ...paragraphColor)}>
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
      const codeTxt = blockContent.code?.rich_text[0]?.text?.content
      const codeLag = blockContent.code?.language
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
      const imageSizeStyles = {
        height: Math.max(30, Math.min(imageSize.height, 360)),
        width: imageSize.width > 768 || screenWidth < 768 ? '100%' : imageSize.width,
      }
      return (
        <div key={blockContent.id} style={imageSizeStyles} className="relative my-3">
          {blockContent.image && (
            <Image
              src={blockContent.image.file.url}
              alt="image"
              fill
              priority
              sizes="100%"
              className={cls(
                'object-left-top',
                imageSize.height > 30 && imageSize.height < 360 ? 'object-fill' : 'object-contain',
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
        <div key={blockContent.id} className="border border-gray-200 dark:border-gray-700">
          {blockContent.video && <video src={blockContent.video.file.url} autoPlay loop muted />}
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
      const codepenUrl = 'https://codepen.io'
      const codepenMyId = 'pminsun'
      const codepenId = blockContent.embed?.url?.split('/')[5].split('?')[0]
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
                <Link href={`${codepenUrl}/${codepenMyId}/pen/${codepenId}`}>videoTag</Link>
                <span>by pminsun</span> (<Link href={`${codepenUrl}/${codepenMyId}`}>@pminsun</Link>
                )<span>on</span>
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
