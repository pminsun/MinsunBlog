export function cls(...classnames: string[]) {
  return classnames.join(' ')
}

// Image 태그 blurDataURL
export const blurDataURLColor =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII='

// aws s3 cloudfront
export const cloudfrontBaseUrl = 'https://dxf0ufub2j2u1.cloudfront.net'

// 생성 날짜를 한국 시간으로 변환
export function korDate(createDate: string) {
  return new Date(new Date(createDate).getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0]
}

// 날짜 점표기로 변환
export const changeDateToDot = (date: string) => {
  const dotDate = date.split('T')[0].slice(-10).replace(/-/g, '.')
  return dotDate
}

// notion style
// paragraph & heading_3 & bulleted_list_item
interface notionText {
  [key: string]: string
}

export const notionTxtColor = (colorName: string) => {
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

export const stylesMap: notionText = {
  bold: 'font-extrabold',
  italic: 'italic',
  strikethrough: 'line-through',
  underline: 'underline underline-offset-4',
  code: 'bg-[#f6f4ef] dark:bg-[#122c42] text-[#eb5757] px-1 rounded',
}
