export default function UseProperties(item: any) {
  const name = item.properties['이름'].title[0].plain_text
  const description = item.properties.Description?.rich_text[0].plain_text
  const github = item.properties.Github?.url
  const date = item.properties.Date?.date.start
  const startDate = item.properties.WokPeriod?.date.start
  const endDate = item.properties.WokPeriod?.date.end
  const tags = item.properties['태그'].multi_select
  const coverImage = item.cover?.external?.url || item.cover?.file?.url
  const url = item.properties.URL?.url

  return {
    name,
    description,
    github,
    date,
    startDate,
    endDate,
    tags,
    coverImage,
    url,
  }
}
