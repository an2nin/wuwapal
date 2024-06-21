import CollectionItem from "./CollectionItem";

interface Props {
    type: string;
    star4s: any;
    star5s: any;
}
export default function CollectionList({ type, star4s, star5s }: Props) {
    return (
        <div className="flex flex-wrap gap-5">
            {star5s &&
                Object.keys(star5s).map((key) => (
                    <CollectionItem
                        key={key}
                        type={type}
                        name={key}
                        count={star5s[key]}
                    />
                ))}
            {star4s &&
                Object.keys(star4s).map((key) => (
                    <CollectionItem
                        key={key}
                        type={type}
                        name={key}
                        count={star4s[key]}
                    />
                ))}
        </div>
    );
}
