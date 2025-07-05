import CustomListItem from "@/core/layout/custom-list-item";
import FilePathCard from "./FilePathCard";
import URLViewer from "./URLViewer";

export default function PCMethod1() {
    return (
        <>
            <CustomListItem title="Open File Explorer and find" index={3}>
                <FilePathCard />
            </CustomListItem>
            <CustomListItem
                title={`Right click "debug.log" file then click "Open with" then select Notepad (If you get error like "The process cannot access the file because it is being used by another process" please exit the game first)`}
                index={4}
            />
            <CustomListItem
                title={`Press CTRL+F then check "Wrap around" and select direction "Up" then in the input box search for "#url" (with the quote) then click Find Next`}
                index={5}
            />
            <CustomListItem
                title={`Copy all the link from https://aki-gm-resources-oversea.aki-game.net to the end. The url looks like this: `}
                index={6}
            >
                <URLViewer
                    path={`https://aki-gm-resources-oversea.aki-game.net/aki/gacha/index.html#/record?svr_id=84ab3961a34f52bd675c29d81e75d9b1&player_id=834729582&lang=en&gacha_id=7&gacha_type=3&svr_area=global&record_id=bb1384edd751652f7492952ce57086ef&resources_id=1fa3de8ab3467bdd8956129351fa7cb4`}
                />
            </CustomListItem>
        </>
    );
}
