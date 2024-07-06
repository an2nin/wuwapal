"use client";
import ImportBtn from "@/app/import/_components/ImportBtn";
import AndroidMethodList from "@/app/import/_components/AndroidMethodList";
import IOSMethodList from "@/app/import/_components/IOSMethodList";
import PCMethodList from "@/app/import/_components/PCMethodLIst";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { useBannerStore } from "@/stores/banner";
import { useState } from "react";

export default function Import() {
    const bannerStore = useBannerStore<any>((state: any) => state);
    const [conveneRecordURL, setConveneRecordURL] = useState(
        bannerStore.banner_record_url || ""
    );
    const [gamePath, setGamePath] = useState(bannerStore.game_path || "");

    const handleRecordURLChange = (event: any) => {
        setConveneRecordURL(event.target.value);
    };
    const handleGamePathChange = (event: any) => {
        setGamePath(event.target.value);
    };
    return (
        <div className="md:mx-10 mx-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Import Convene Record
            </h1>
            <h3 className="text-lg my-2">
                🚀 Choose your platform and follow the steps to start tracking
                your Convene Record! 📈
            </h3>
            <Tabs defaultValue="pc" className="w-full">
                <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="pc">PC</TabsTrigger>
                    <TabsTrigger value="android">Android</TabsTrigger>
                    <TabsTrigger value="ios">IOS</TabsTrigger>
                </TabsList>
                <TabsContent value="pc">
                    <PCMethodList
                        conveneRecordURL={conveneRecordURL}
                        handleRecordURLChange={handleRecordURLChange}
                        gamePath={gamePath}
                        handleGamePathChange={handleGamePathChange}
                    />
                </TabsContent>
                <TabsContent value="android">
                    <AndroidMethodList
                        conveneRecordURL={conveneRecordURL}
                        handleRecordURLChange={handleRecordURLChange}
                    />
                </TabsContent>
                <TabsContent value="ios">
                    <IOSMethodList
                        setConveneRecordURL={setConveneRecordURL}
                    />
                </TabsContent>
            </Tabs>
            <div className="md:ml-28 ml-12 mt-4">
                <ImportBtn historyUrl={conveneRecordURL} gamePath={gamePath} />
            </div>
        </div>
    );
}
