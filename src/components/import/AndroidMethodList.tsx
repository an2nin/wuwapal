import { useState } from "react";
import CustomListItem from "@/components/convene/CustomListItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface Props {
    conveneRecordURL: string;
    handleRecordURLChange: (value: any) => void;
}

export default function AndroidMethodList({
    conveneRecordURL,
    handleRecordURLChange,
}: Props) {
    const [androidMethod, setAndroidMethod] = useState("ascent");
    return (
        <>
            <div className="md:mx-10 mx-0">
                <h3 className="text-xl font-bold md:text-2xl">
                    Choose a method
                </h3>
                <p className="text-muted-foreground">
                    If none of the two methods for Android works for you 😢, hit
                    me up on{" "}
                    <a
                        className="underline"
                        href="https://discord.com/invite/DFKG4nqUD4"
                    >
                        Discord
                    </a>{" "}
                    👾 and I will do my best to help! 💪
                </p>
                <Tabs
                    value={androidMethod}
                    onValueChange={setAndroidMethod}
                    className="w-full my-0"
                >
                    <TabsList className="grid grid-cols-2 mt-2 mb-4">
                        <TabsTrigger value="ascent">Ascent</TabsTrigger>
                        <TabsTrigger value="termux ">Termux</TabsTrigger>
                    </TabsList>
                    <ol className="relative border-s ms-3 md:mx-10 mx-0">
                        {/* Tabs Content */}
                        {androidMethod == "ascent" ? (
                            <CustomListItem
                                title="Use Ascent App To Get Convene Record URL"
                                index={1}
                            >
                                <div>
                                    Similar to accessing your history in Genshin
                                    Impact or Honkai Star Rail, follow this
                                    guide by
                                    <a
                                        target="_blank"
                                        href="https://gist.github.com/Mirai0009/8615e52e09083de9c0ea2dc00dc62ea8"
                                        className="font-bold underline mx-1"
                                    >
                                        Mirai0009
                                    </a>
                                    to download and use
                                    <a
                                        target="_blank"
                                        href="https://github.com/4o3F/Ascent"
                                        className="font-bold underline mx-1"
                                    >
                                        Ascent
                                    </a>
                                    to obtain your URL.
                                </div>
                            </CustomListItem>
                        ) : (
                            <CustomListItem
                                title="Use Termux App To Get Convene Record URL"
                                index={1}
                            >
                                <div>
                                    Similar to accessing your history in Genshin
                                    Impact or Honkai Star Rail, follow this
                                    guide by
                                    <a
                                        target="_blank"
                                        href="https://gist.github.com/eqdamini/d3accb76dc5e82f9c30d398a9fc5626d"
                                        className="font-bold underline mx-1"
                                    >
                                        eqdamini
                                    </a>
                                    to download and use
                                    <a
                                        target="_blank"
                                        href="https://f-droid.org/en/packages/com.termux/"
                                        className="font-bold underline mx-1"
                                    >
                                        Tremux
                                    </a>
                                    to obtain your URL.
                                </div>
                            </CustomListItem>
                        )}
                        {/* Tabs Content */}
                        <CustomListItem
                            title="Paste the text to the textbox below."
                            index={2}
                        >
                            <Input
                                placeholder="Paste the text here"
                                value={conveneRecordURL}
                                onChange={handleRecordURLChange}
                            />
                        </CustomListItem>
                        <CustomListItem
                            title="Click on the import button"
                            index="F"
                            last={true}
                        />
                    </ol>
                </Tabs>
            </div>
        </>
    );
}
