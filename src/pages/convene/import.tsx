import CopyCardSemiAutomatic from "@/components/convene/CopyCardSemiAutomatic";
import CustomListItem from "@/components/convene/CustomListItem";
import FilePathCard from "@/components/convene/FilePathCard";
import ImportBtn from "@/components/convene/ImportBtn";
import CopyCardAutomatic from "@/components/convene/CopyCardAutomatic";
import URLViewer from "@/components/convene/URLViewer";
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
import { useBannerStore } from "@/stores/banner";
export default function ConveneImport() {
    const bannerStore = useBannerStore<any>((state: any) => state);
    const [type, setType] = useState("automatic");
    const [inputValue, setInputValue] = useState(bannerStore.banner_record_url || "");
    const [gamePath, setGamePath] = useState(bannerStore.game_path || "");

    const handleTypeChange = (value: string) => {
        setType(value);
    };

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };
    const handleGamePathChange = (event: any) => {
        setGamePath(event.target.value);
    };
    return (
        <div className="flex flex-col">
            <div className="flex gap-5 items-center">
                <h1 className="text-xl font-semibold md:text-4xl">
                    Import Convene Record
                </h1>
            </div>
            <ol className="relative border-s ms-3 mt-10">
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
                                <SelectItem value="manual-less">
                                    Semi Automatic
                                </SelectItem>
                                <SelectItem value="manual-more">
                                    Manual
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CustomListItem>
                {type == "automatic" && (
                    <>
                        <CustomListItem
                            title="Open Windows PowerShell and run the following command."
                            index={4}
                        >
                            <CopyCardAutomatic />
                        </CustomListItem>
                    </>
                )}
                {type == "manual-less" && (
                    <>
                        <CustomListItem
                            title="Enter your installation directory"
                            index={4}
                        >
                            <p className="text-sm text-muted-foreground mb-1">
                                Find the folder that contains
                                <span className="font-bold text-primary mx-1">
                                    Wuthering Waves.exe
                                </span>
                                and
                                <span className="font-bold text-primary mx-1">
                                    Client
                                </span>
                                folder.
                            </p>
                            <Input
                                placeholder="E.g. D:\Wuthering Waves\Wuthering Waves Game"
                                onChange={handleGamePathChange}
                                value={gamePath}
                            />
                        </CustomListItem>
                        <CustomListItem
                            title={"Open Windows PowerShell and run the following command."}
                            index={5}
                        >
                            <CopyCardSemiAutomatic text={gamePath} />
                        </CustomListItem>
                    </>
                )}
                {type == "manual-more" && (
                    <>
                        <CustomListItem
                            title="Open File Explorer and find"
                            index={4}
                        >
                            <FilePathCard />
                        </CustomListItem>
                        <CustomListItem
                            title={`Right click "debug.log" file then click "Open with" then select Notepad (If you get error like "The process cannot access the file because it is being used by another process" please exit the game first)`}
                            index={5}
                        />
                        <CustomListItem
                            title={`Press CTRL+F then check "Wrap around" and select direction "Up" then in the input box search for "#url" (with the quote) then click Find Next`}
                            index={6}
                        />
                        <CustomListItem
                            title={`Copy all the link from https://aki-gm-resources-oversea.aki-game.net to the end. The url looks like this: `}
                            index={7}
                        >
                            <URLViewer
                                path={`https://aki-gm-resources-oversea.aki-game.net/aki/gacha/index.html#/record?svr_id=84ab3961a34f52bd675c29d81e75d9b1&player_id=834729582&lang=en&gacha_id=7&gacha_type=3&svr_area=global&record_id=bb1384edd751652f7492952ce57086ef&resources_id=1fa3de8ab3467bdd8956129351fa7cb4`}
                            />
                        </CustomListItem>
                    </>
                )}
                <CustomListItem
                    title="Paste the text to the textbox below."
                    index={type == "manual" ? 8 : 5}
                >
                    <Input
                        placeholder="Paste the text here"
                        onChange={handleInputChange}
                        value={inputValue}
                    />
                </CustomListItem>
                <CustomListItem
                    title="Click on the import button"
                    index={type == "manual" ? 9 : 6}
                    last={true}
                />
            </ol>
            <div className="ml-12 mt-2">
                <ImportBtn historyUrl={inputValue} gamePath={gamePath} />
            </div>
        </div>
    );
}
