import CustomListItem from "@/components/convene/CustomListItem";
import ImportBtn from "@/components/convene/ImportBtn";
import PowerShellCopyCard from "@/components/convene/PowerShellCopyCard";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
export default function ConveneImport() {
    const [type, setType] = useState("automatic");
    const [inputValue, setInputValue] = useState("");

    const handleTypeChange = (value: string) => {
        setType(value);
    };

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };
    return (
        <div className="flex flex-col">
            <div className="flex gap-5 items-center">
                <h1 className="text-xl font-semibold md:text-4xl">
                    Import Convene Record
                </h1>
            </div>
            <div className="flex flex-col gap-5 mt-10">
                <CustomListItem title="Open Wuthering Waves on PC." index={1} />
                <CustomListItem
                    title="Open Convene Records from any banner."
                    index={2}
                />
                <CustomListItem title="Select Import Type" index={3}>
                    <Select value={type} onValueChange={handleTypeChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="automatic">
                                    Automatic
                                </SelectItem>
                                <SelectItem value="manual">Manual</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CustomListItem>
                {type == "automatic" ? (
                    <>
                        <CustomListItem
                            title="Open Windows PowerShell and run the following command."
                            index={4}
                        >
                            <PowerShellCopyCard />
                        </CustomListItem>
                        <CustomListItem
                            title="Paste the text to the textbox below."
                            index={5}
                        >
                            <Input
                                placeholder="Paste the text here"
                                onChange={handleInputChange}
                                value={inputValue}
                            />
                        </CustomListItem>
                    </>
                ) : (
                    <CustomListItem
                        title="Open Windows PowerShell and run the asd command."
                        index={4}
                    >
                        <PowerShellCopyCard />
                    </CustomListItem>
                )}
                <CustomListItem title="Import your convene record" index={6}>
                    <ImportBtn historyUrl={inputValue} />
                </CustomListItem>
            </div>
        </div>
    );
}
