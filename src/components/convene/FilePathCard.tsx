import { Card, CardContent } from "@/components/ui/card";

interface Props {}
export default function FilePathCard({}) {
    return (
        <>
            <Card className="md:max-w-xl sm:max-w-72 max-w-72 lg:max-w-2xl xl:max-w-full">
                <CardContent className="p-5">
                    <div className="w-full whitespace-nowrap overflow-auto text-xs pb-2">
                        <span className="font-bold text-red-500">
                            Install Folder
                        </span>
                        \Wuthering Waves
                        Game\Client\Binaries\Win64\ThirdParty\KrPcSdk_Global\KRSDKRes\KRSDKWebView\debug.log
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
