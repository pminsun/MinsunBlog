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
      <Link key={index} href={content} target="_blank" className="link-style">
        {content}
      </Link>
    ) : (
      <span
        key={index}
        className={cls('detail-paragraph', textStyles, content === '참고' ? 'link-none-style' : '')}
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
            <p key={blockContent.id} className={cls('paragraph-style', ...paragraphColor)}>
              {richTextContent}
            </p>
          ) : (
            <p className="py-3" />
          )}
        </>
      )
    case 'bulleted_list_item':
      return (
        <li key={blockContent.id} className={cls('bulletedList-style', ...paragraphColor)}>
          {richTextContent}
        </li>
      )
    case 'heading_3':
      return (
        <>
          <p key={blockContent.id} className={cls('heading3-style', ...paragraphColor)}>
            {richTextContent}
          </p>
        </>
      )
    case 'quote':
      return (
        <>
          <div key={blockContent.id} className={cls('quote-style', ...paragraphColor)}>
            <span></span>
            <p>{richTextContent}</p>
          </div>
        </>
      )
    case 'code':
      const codeTxt = blockContent.code?.rich_text[0]?.text?.content
      const codeLag = blockContent.code?.language
      return (
        <pre key={blockContent.id} className="code-style">
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
        <div key={blockContent.id} style={imageSizeStyles} className="image-style">
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
        <div key={blockContent.id} className="video-style">
          {blockContent.video && <video src={blockContent.video.file.url} autoPlay loop muted />}
        </div>
      )
    case 'bookmark':
      return (
        <div key={blockContent.id} className="bookmark-style">
          {blockContent.bookmark && (
            <Link href={blockContent.bookmark.url} target="_blank">
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
        <div key={blockContent.id} className="embed-style">
          {mounted && (
            <>
              <iframe
                height="350"
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
