interface TitleType {
  title: string;
  subMent?: string;
}

export default function Title({ title, subMent }: TitleType) {
  return (
    <div className="text-center lg:text-left">
      <h2 className="text-2xl lg:text-3xl font-bold mb-0 lg:mb-2">{title}</h2>
      <span className="text-[10px] lg:text-xs dark:text-slate-300">
        {subMent}
      </span>
    </div>
  );
}
