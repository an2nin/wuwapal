interface Props {
  children?: React.ReactNode;
  title?: any;
  index: number | string;
  last?: boolean;
  img?: string;
}
export default function CustomListItem({
  children,
  title,
  index,
  last = false,
  img,
}: Props) {
  return (
    <li className={`ms-8 ${last ? '' : 'mb-10'}`}>
      <span className="absolute -start-[18px] border bg-card rounded-full w-9 h-9 p-3 flex justify-center items-center">
        <p className="font-bold text-primary">{index}</p>
      </span>
      {title && (
        <h3 className="flex items-center mb-1 text-base font-semibold text-foreground pt-1">
          {title}
        </h3>
      )}

      <div className={`text-sm ${last ? '' : 'mb-4 mt-2'}`}>
        {children}
        {img && <img className="h-96 w-64" src={img} alt={title} />}
      </div>
    </li>
  );
}
