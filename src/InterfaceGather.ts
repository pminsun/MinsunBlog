interface Annotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

interface CreatedBy {
  object: string
  id: string
}

interface LastEditedBy {
  object: string
  id: string
}

interface Text {
  content: string
  link: null | string
}

interface Cover {
  type: string
  external?: {
    url: string
  }
  file?: {
    url: string
  }
}

export interface RichText {
  type: string
  text: Text
  annotations: Annotations
  plain_text: string
  href: null | string
}

export interface MultiSelect {
  id: string
  name: string
  color: string
}

interface Properties {
  Date?: {
    id: string
    type: string
    date: {
      start: string
      end: null | string
      time_zone: null
    }
  }
  Description: {
    id: string
    type: string
    rich_text: RichText[]
  }
  WokPeriod?: {
    id: string
    type: string
    date: {
      start: string
      end: string
      time_zone: null
    }
  }
  태그: {
    id: string
    type: string
    multi_select: MultiSelect[]
  }
  Github?: {
    id: string
    type: string
    url: string
  }
  이름: {
    id: string
    type: string
    title: [
      {
        type: string
        text: Text
        annotations: Annotations
        plain_text: string
        href: null | string
      },
    ]
  }
}

export interface ListResults {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  created_by: CreatedBy
  last_edited_by: LastEditedBy
  cover: Cover
  icon: null | string
  parent: {
    type: string
    database_id: string
  }
  archived: boolean
  properties: Properties
  url: string
  public_url: null
}

export interface DataListObject {
  combinedBlogs: ListResults[]
}

export interface ProjectistObject {
  projects: ListResults[]
}

export interface TableRow {
  annotations: Annotations
  href: string
  plain_text: string
  text: {
    content: string
    link: {
      url: string
    }
  }
  type: string
}

export interface TableResults {
  archived: boolean
  created_by: CreatedBy
  created_time: string
  has_children: boolean
  id: string
  last_edited_by: LastEditedBy
  last_edited_time: string
  object: string
  parent: {
    type: string
    block_id: string
  }
  table_row: {
    cells: TableRow[]
  }
  type: string
}

export interface TableData {
  block: {}
  has_more: boolean
  next_cursor: null | string
  object: string
  request_id: string
  results: TableResults[]
  type: string
}

export interface PropertiesData {
  archived: boolean
  cover: Cover
  created_by: CreatedBy
  created_time: string
  icon: null | string
  id: string
  last_edited_by: LastEditedBy
  last_edited_time: string
  object: string
  parent: {
    type: string
    database_id: string
  }
  properties: Properties
  public_url: null | string
  request_id: string
  url: string
}

export interface BlockDetailResults {
  archived: boolean
  created_by: CreatedBy
  created_time: string
  has_children: boolean
  id: string
  last_edited_by: LastEditedBy
  last_edited_time: string
  object: string
  parent: {
    type: string
    page_id: string
  }
  type: string
  paragraph?: {
    rich_text: RichText[]
    color: string
  }
}

export interface BlockDetail {
  block: {}
  has_more: boolean
  next_cursor: null | string
  object: string
  request_id: string
  results: BlockDetailResults[]
  type: string
}

export interface BlockDetailData {
  blockDetail: BlockDetail
  propertiesData: PropertiesData
  tableData?: TableData
}

// tag
export interface TagType {
  color: string
  id: string
  name: string
}
export interface TagsType {
  tags: TagType[]
  viewStyle?: string
  tagCategory?: string
}

// post
export interface PostType {
  item: ListResults
  viewStyle: string
  tagCategory: string
  awsImages?: string | null
}

//PostDetailProp
export interface PostDetailPropType {
  name: string
  tags: TagType[]
  github?: string
  description: string
  createDate: string
  imageUrl?: string
  awsImageName?: string | string[]
}

// PostDetailContent
export interface PostDetailContentType {
  archived: boolean
  created_by: CreatedBy
  created_time: string
  has_children: boolean
  id: string
  last_edited_by: LastEditedBy
  last_edited_time: string
  object: string
  parent: {
    type: string
    page_id: string
  }
  type: string
  heading_3?: {
    color: string
    is_toggleable: boolean
    rich_text: RichText[]
  }
  paragraph?: {
    color: string
    rich_text: RichText[]
  }

  bulleted_list_item?: {
    color: string
    rich_text: RichText[]
  }
  code?: {
    caption: []
    language: string
    rich_text: RichText[]
  }
  bookmark?: {
    caption: []
    url: string
  }
  image?: {
    caption: []
    file: { url: string; expiry_time: string }
    type: string
  }
  video?: {
    caption: []
    file: {
      url: string
      expiry_time: string
    }
    type: string
  }
  embed?: {
    caption: []
    url: string
  }
  table?: {
    has_column_header: boolean
    has_row_header: boolean
    table_width: number
  }
}

export interface BlockTextType {
  [key: string]: {
    color: string
    rich_text: RichText[]
  }
}

export interface BlockContentType {
  blockContent: PostDetailContentType & BlockTextType
}

//PostHeatMap
export interface PostHeatMapType {
  combinedBlogs: ListResults[]
  year: number
  month: string
}

export interface PostCountType {
  [date: string]: number
}

// Pagination
export interface PaginationType {
  postsPerPage: number
  totalPosts: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
