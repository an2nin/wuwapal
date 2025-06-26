import { useEffect, useState } from "react";
import CustomListItem from "@/shared/components/layout/CustomListItem";
import { Textarea } from "@/shared/components/ui/textarea";
import { validateJsonString } from "@/shared/helpers/validators";
import { convertJsonToUrl } from "@/shared/helpers/processors";
import { toast } from "sonner";

interface Props {
    setConveneRecordURL: (value: any) => void;
}

export default function IOSMethodList({ setConveneRecordURL }: Props) {
    const [recordJson, setRecordJson] = useState("");
    const [isRecordJsonInputValid, setIsRecordJsonInputValid] = useState(false);

    const handleRecordJsonChange = (event: any) => {
        setRecordJson(event.target.value);
    };

    useEffect(() => {
        if(recordJson == "") {
            setIsRecordJsonInputValid(false);
            return;
        };

        const validation = validateJsonString(recordJson);
        if (validation.isValid) {
            setIsRecordJsonInputValid(true);
            setConveneRecordURL(convertJsonToUrl(recordJson));
        } else {
            setIsRecordJsonInputValid(false);
            toast.error(validation.errors.join(", "));
        }
    }, [recordJson]);

    return (
        <>
            <div className="md:mx-10 mx-0 mt-5">
                <ol className="relative border-s ms-3 md:mx-10 mx-0">
                    {/* Tabs Content */}

                    <CustomListItem
                        title="Install the Stream Network Debug Tool App on your phone"
                        index={1}
                    >
                        <a
                            href="https://apps.apple.com/us/app/stream-network-debug-tool/id1312141691"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline font-bold"
                        >
                            Stream - Network Debug Tool Official App Link
                        </a>
                    </CustomListItem>
                    <CustomListItem
                        title="Make sure Safari is set as your default browser. This is only necessary for the initial setup."
                        index={2}
                    />
                    <CustomListItem
                        title={`Launch the Stream app and select "Sniff Now." When a pop-up appears requesting permission to add VPN Configurations, click "Allow."`}
                        index={3}
                        img="/ios/step3.webp"
                    />
                    <CustomListItem
                        title={`A pop-up will appear requesting to install a CA. Click "Install CA."`}
                        index={4}
                        img="/ios/step4.webp"
                    />
                    <CustomListItem
                        title={`A new page will open in Stream. On this page, click "Install CA Certificate."`}
                        index={5}
                    />
                    <CustomListItem
                        title={`Safari will open and ask for permission to download. Click "Allow."`}
                        index={6}
                    />
                    <CustomListItem
                        title={`Go to Settings ➡️ General ➡️ VPN & Device Management, and open the Stream Generated CA. Click "Install" to install the profile.`}
                        index={7}
                        img="/ios/step7.webp"
                    />
                    <CustomListItem
                        title={`Return to the Stream app, where a new pop-up will appear. Click on "I've trusted." Then, on the main page of the Stream app, click the "Stop Sniffing" button.`}
                        index={8}
                        img="/ios/step8.webp"
                    />
                    <CustomListItem
                        title={`Navigate to Settings ➡️ General ➡️ About ➡️ Certificate Trust Settings, and toggle the slider next to Stream Generated CA to enable it. A pop-up titled "Root Certificate" will appear. Click "Continue."`}
                        index={9}
                        img="/ios/step9.webp"
                    />
                    <CustomListItem
                        title={`Launch Wuthering Waves and navigate to the convene page, but refrain from opening your in-game convene records yet.`}
                        index={10}
                    />
                    <CustomListItem
                        title={`Open the Stream app and click "Sniff Now".`}
                        index={11}
                        img="/ios/step11.webp"
                    />
                    <CustomListItem
                        title={`Return to Wuthering Waves and open your in-game convene history.`}
                        index={12}
                    />
                    <CustomListItem
                        title={`Once you see resonators/weapons show up in your convene history, return to the Stream app and click "Stop Sniffing".`}
                        index={13}
                    >
                        <img
                            className="h-96"
                            src={"/ios/step13.webp"}
                            alt={"pull image"}
                        />
                    </CustomListItem>
                    <CustomListItem
                        title={`Click on "Sniff History." This will open a page displaying a list of dates and times. Click on the topmost entry.`}
                        index={14}
                        img="/ios/step14.webp"
                    />
                    <CustomListItem
                        title={`Click on the "Group By Host" tab at the top, then choose the URL labeled "gmserver-api.aki-game2.net".`}
                        index={15}
                        img="/ios/step15.webp"
                    />
                    <CustomListItem
                        title={`Click on any of the options with "POST" in the top-left corner.`}
                        index={16}
                        img="/ios/step16.webp"
                    />
                    <CustomListItem
                        title={`In the next page, click the "Request" tab at the top of the page.`}
                        index={17}
                        img="/ios/step17.webp"
                    />
                    <CustomListItem
                        title={`Click on "Preview JSON" at the lower part of the page. This will display some text containing words like "recordId" and "playerId". Copy this text and paste it into the text input at the bottom of the wuwapal.com page. IMPORTANT: Ensure to include the curly braces at the beginning and end when pasting the text.`}
                        index={18}
                        img="/ios/step18.webp"
                    />

                    {/* Tabs Content */}
                    <CustomListItem
                        title="Paste your JSON text to the textarea below."
                        index={19}
                    >
                        <Textarea
                            className={`${
                                !isRecordJsonInputValid && "border-red-500"
                            }`}
                            value={recordJson}
                            onChange={handleRecordJsonChange}
                        />
                    </CustomListItem>
                    <CustomListItem
                        title="Click on the import button"
                        index="F"
                        last={true}
                    />
                </ol>
            </div>
        </>
    );
}
