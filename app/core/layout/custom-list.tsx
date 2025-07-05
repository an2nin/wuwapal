interface Props {
    children?: React.ReactNode;
}
export default function CustomList({ children }: Props) {
    return <ol className="relative border-s ms-3 md:mx-10 mx-0">{children}</ol>;
}
