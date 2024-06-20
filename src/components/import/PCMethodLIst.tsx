import { useState } from "react";
import CustomListItem from "@/components/convene/CustomListItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import PCMethod1 from "@/components/import/PCMethod1";
import PCMethod2 from "@/components/import/PCMethod2";
import PCMethod3 from "@/components/import/PCMethod3";

interface Props {
    conveneRecordURL: string;
    gamePath: string;
    handleRecordURLChange: (value: any) => void;
    handleGamePathChange: (value: any) => void;
}

export default function PCMethodList({
    conveneRecordURL,
    gamePath,
    handleRecordURLChange,
    handleGamePathChange,
}: Props) {
    const [pcMethod, setPcMethod] = useState("auto");
    const inputSrNum = pcMethod == "auto" ? 4 : pcMethod == "semi" ? 5 : 7;
    return (
        <>
            <div className="md:mx-10 mx-0">
                <h3 className="text-xl font-bold md:text-2xl">
                    Choose a method
                </h3>
                <p className="text-muted-foreground">
                    If none of the three methods for PC work for you 😢, hit me
                    up on{" "}
                    <a
                        className="underline"
                        href="https://discord.com/invite/DFKG4nqUD4"
                    >
                        Discord
                    </a>{" "}
                    👾 and I will do my best to help! 💪
                </p>
                <Tabs
                    value={pcMethod}
                    onValueChange={setPcMethod}
                    className="w-full my-0"
                >
                    <TabsList className="grid grid-cols-3 mt-2 mb-4">
                        <TabsTrigger value="auto">Automatic</TabsTrigger>
                        <TabsTrigger value="semi">Little Work</TabsTrigger>
                        <TabsTrigger value="not">Pain in D A$$</TabsTrigger>
                    </TabsList>
                    <ol className="relative border-s ms-3 md:mx-10 mx-0">
                        <CustomListItem
                            title="Open Wuthering Waves on PC."
                            index={1}
                        />
                        <CustomListItem
                            title="Open Convene Records from any banner."
                            index={2}
                        />

                        {/* Tabs Content */}
                        <TabsContent value="auto" className="my-0">
                            <PCMethod1 />
                        </TabsContent>
                        <TabsContent value="semi" className="my-0">
                            <PCMethod2
                                gamePath={gamePath}
                                handleGamePathChange={handleGamePathChange}
                            />
                        </TabsContent>
                        <TabsContent value="not" className="my-0">
                            <PCMethod3 />
                        </TabsContent>
                        {/* Tabs Content */}
                        <CustomListItem
                            title="Paste the text to the textbox below."
                            index={inputSrNum}
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
