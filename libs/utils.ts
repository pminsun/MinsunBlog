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
