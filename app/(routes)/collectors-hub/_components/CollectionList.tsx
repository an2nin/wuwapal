import { useState } from "react";
import CollectionItem from "./CollectionItem";
import ResourceDialog from "./ResourceDialog";

interface Props {
    type: string;
    resources: any;
    collected: any;
}
export default function CollectionList({ type, resources, collected }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedResource, setSelectedResource] = useState<any>();

    const clickHandler = (resource: any) => {
        setSelectedResource(resource);
        // setIsDialogOpen(true);
    };

    return (
        <>
            <ResourceDialog
                isOpen={isDialogOpen}
                onDialogChange={setIsDialogOpen}
                resource={selectedResource}
            />
            <div className="flex flex-wrap lg:gap-5 gap-3 justify-center md:justify-start bg-pattern-stripped p-3 lg:p-5 rounded-xl">
                {resources &&
                    collected &&
                    Object.keys(resources).map((resourceName, idx) => (
                        <CollectionItem
                            key={idx}
                            type={type}
                            name={resourceName}
                            resource={resources[resourceName]}
                            count={collected[resourceName]}
                            clickHandler={() => clickHandler({
                                name: resourceName,
                                info: resources[resourceName],
                                type: type,
                                count: collected[resourceName], 
                            })}
                        />
                    ))}
            </div>
        </>
    );
}
