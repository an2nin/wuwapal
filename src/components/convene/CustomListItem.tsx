interface Props {
    children?: React.ReactNode;
    title: any;
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
        <li className={`ms-8  ${last ? "" : "mb-10"}`}>
            <span className="absolute -start-4 bg-accent rounded-full w-8 h-8 p-3 flex justify-center items-center">
                <p className="font-bold text-accent-foreground">{index}</p>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-foreground">
                {title}
            </h3>

            <div className={`${last ? "" : "mb-4 mt-2"}`}>
                {children}
                {img && <img className="h-96 w-64" src={img} alt={title} />}
            </div>
        </li>
    );
}
