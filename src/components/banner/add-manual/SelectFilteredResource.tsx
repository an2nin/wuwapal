import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";

interface Props {
    selectedResource: any;
    filteredResources: any;
    setSelectedResource: React.Dispatch<React.SetStateAction<any>>;
    handleSelectedResourceChange: (value: string) => void;
}
export default function SelectFilteredResource({
    selectedResource,
    handleSelectedResourceChange,
    filteredResources,
}: Props) {
    return (
        <div className="flex flex-col gap-3">
            <div className="font-bold ">Choose Resource</div>
            <Select
                value={selectedResource}
                onValueChange={handleSelectedResourceChange}
            >
                <SelectTrigger className="w-[180px]">
                    {selectedResource?.name}
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {filteredResources.map((resource: any, idx: number) => (
                            <SelectItem key={idx} value={resource}>
                                <div className="flex items-center gap-2">
                                    <img
                                        className="w-7 h-7"
                                        src={
                                            process.env.NEXT_PUBLIC_IMAGE_URL +
                                            resource.image_path
                                        }
                                        alt={resource.name}
                                    />
                                    {resource.name}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
