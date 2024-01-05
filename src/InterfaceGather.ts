interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface CreatedBy {
  object: string;
  id: string;
}

interface LastEditedBy {
  object: string;
  id: string;
}

interface Text {
  content: string;
  link: null | string;
}

interface Cover {
  type: string;
  external?: {
    url: string;
  };
  file?: {
    url: string;
  };
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null | string;
}

export interface MultiSelect {
  id: string;
  name: string;
  color: string;
}

interface Properties {
  Date?: {
    id: string;
    type: string;
    date: {
      start: string;
      end: null | string;
      time_zone: null;
    };
  };
  Description: {
    id: string;
    type: string;
    rich_text: RichText[];
  };
  WokPeriod?: {
    id: string;
    type: string;
    date: {
      start: string;
      end: string;
      time_zone: null;
    };
  };
  태그: {
    id: string;
    type: string;
    multi_select: MultiSelect[];
  };
  Github?: {
    id: string;
    type: string;
    url: string;
  };
  이름: {
    id: string;
    type: string;
    title: [
      {
        type: string;
        text: Text;
        annotations: Annotations;
        plain_text: string;
        href: null | string;
      }
    ];
  };
}

export interface ListResults {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover: Cover;
  icon: null | string;
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: Properties;
  url: string;
  public_url: null;
}

export interface DataListObject {
  has_more: boolean;
  next_cursor: null | string;
  object: string;
  page_or_database: {} | null;
  request_id: string;
  results: ListResults[];
  type: string;
}

export interface BlogistObject {
  blogs: DataListObject;
}

export interface ProjectistObject {
  projects: DataListObject;
}

export interface TableRow {
  annotations: Annotations;
  href: string;
  plain_text: string;
  text: {
    content: string;
    link: {
      url: string;
    };
  };
  type: string;
}

export interface TableResults {
  archived: boolean;
  created_by: CreatedBy;
  created_time: string;
  has_children: boolean;
  id: string;
  last_edited_by: LastEditedBy;
  last_edited_time: string;
  object: string;
  parent: {
    type: string;
    block_id: string;
  };
  table_row: {
    cells: TableRow[];
  };
  type: string;
}

export interface TableData {
  block: {};
  has_more: boolean;
  next_cursor: null | string;
  object: string;
  request_id: string;
  results: TableResults[];
  type: string;
}

export interface PropertiesData {
  archived: boolean;
  cover: Cover;
  created_by: CreatedBy;
  created_time: string;
  icon: null | string;
  id: string;
  last_edited_by: LastEditedBy;
  last_edited_time: string;
  object: string;
  parent: {
    type: string;
    database_id: string;
  };
  properties: Properties;
  public_url: null | string;
  request_id: string;
  url: string;
}

export interface BlockDetailResults {
  archived: boolean;
  created_by: CreatedBy;
  created_time: string;
  has_children: boolean;
  id: string;
  last_edited_by: LastEditedBy;
  last_edited_time: string;
  object: string;
  paragraph: {
    rich_text: RichText[];
    color: string;
  };
  parent: {
    type: string;
    page_id: string;
  };
  type: string;
}

export interface BlockDetail {
  block: {};
  has_more: boolean;
  next_cursor: null | string;
  object: string;
  request_id: string;
  results: BlockDetailResults[];
  type: string;
}

export interface BlockDetailData {
  blockDetail: BlockDetail;
  propertiesData: PropertiesData;
  tableData?: TableData;
}
