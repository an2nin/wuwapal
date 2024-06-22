import CollectionItem from "./CollectionItem";

interface Props {
    type: string;
    resources: any;
    collected: any;
}
export default function CollectionList({ type, resources, collected }: Props) {
    return (
        <div className="flex flex-wrap gap-5">
            {resources &&
                collected &&
                Object.keys(resources).map((resourceName, idx) => (
                    <CollectionItem
                        key={idx}
                        type={type}
                        name={resourceName}
                        resource={resources[resourceName]}
                        count={collected[resourceName]}
                    />
                ))}
        </div>
    );
}
