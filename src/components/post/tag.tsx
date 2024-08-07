import { TagType, TagsType } from '@/InterfaceGather'
import DEFINE from '@/constant/Global'
import UseTagsColor from 'libs/useTagsColor'
import { cls } from 'libs/utils'

export default function Tag(props: TagsType) {
  const { tags, viewStyle, tagCategory } = props
  const exceptAllEtc =
    tagCategory === DEFINE.TAGCATEGORY.ALL || tagCategory === DEFINE.TAGCATEGORY.ETC
      ? tags[0].name
      : tagCategory

  return (
    <div className="flex gap-2">
      {viewStyle === 'list' && tags.length > 1 ? (
        <div className="flex items-end gap-1 md:hidden">
          <span
            className={cls(UseTagsColor(exceptAllEtc ?? ''), 'p-1 rounded text-[10px] tag-name')}
          >
            {exceptAllEtc}
          </span>
          <span className="text-[10px]">etc</span>
        </div>
      ) : null}
      {tags.map((tag: TagType) => (
        <span
          key={tag.id}
          className={cls(
            UseTagsColor(tag.name),
            'p-1 rounded text-[10px] tag-name !text-black',
            viewStyle === 'list' && tags.length > 1 ? 'hidden md:inline-block' : '',
          )}
        >
          {tag.name}
        </span>
      ))}
    </div>
  )
}
