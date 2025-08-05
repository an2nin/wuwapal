import CustomListItem from '@/shared/components/custom-list-item';
import { Card, CardContent } from '@/shared/components/ui/card';

export default function PCMethod3() {
  return (
    <>
      <CustomListItem title="Open File Explorer and find" index={3}>
        <Card>
          <CardContent className="p-5">
            <div className="w-full whitespace-nowrap overflow-auto text-xs pb-2">
              <span className="font-bold text-red-500">Install Folder</span>
              \Wuthering Waves
              Game\Client\Binaries\Win64\ThirdParty\KrPcSdk_Global\KRSDKRes\KRSDKWebView\debug.log
            </div>
          </CardContent>
        </Card>
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
        <Card>
          <CardContent className="p-5">
            <div className="w-full whitespace-nowrap overflow-auto text-xs pb-2">
              https://aki-gm-resources-oversea.aki-game.net/aki/gacha/index.html#/record?svr_id=84ab3961a34f52bd675c29d81e75d9b1&player_id=834729582&lang=en&gacha_id=7&gacha_type=3&svr_area=global&record_id=bb1384edd751652f7492952ce57086ef&resources_id=1fa3de8ab3467bdd8956129351fa7cb4
            </div>
          </CardContent>
        </Card>
      </CustomListItem>
    </>
  );
}
