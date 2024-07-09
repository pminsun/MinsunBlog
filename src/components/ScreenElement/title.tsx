interface TitleType {
  title: string
  subMent?: string
}

export default function Title({ title, subMent }: TitleType) {
  return (
    <div className="title-container">
      <h2>{title}</h2>
      <span>{subMent}</span>
    </div>
  )
}
