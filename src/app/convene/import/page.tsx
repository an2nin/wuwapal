"use client";
import ImportBtn from "./_components/ImportBtn";
import AndroidMethodList from "./_components/AndroidMethodList";
import IOSMethodList from "./_components/IOSMethodList";
import PCMethodList from "./_components/PCMethodLIst";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/_components/ui/tabs";
import { useEffect, useState } from "react";
import { useProfileStore, ProfileStoreState } from "@/stores/profile";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/app/_components/ui/alert";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function Import() {
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );
    const [conveneRecordURL, setConveneRecordURL] = useState("");
    const [gamePath, setGamePath] = useState("");

    const handleRecordURLChange = (event: any) => {
        setConveneRecordURL(event.target.value);
    };
    const handleGamePathChange = (event: any) => {
        setGamePath(event.target.value);
    };

    useEffect(() => {
        setConveneRecordURL(profileStore.getBannerRecordUrl() || "");
        setGamePath(profileStore.getGamePath() || "");
    }, [profileStore]);

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

                {/* <Alert className="mt-4" variant="warning">
                    <AlertTitle className="flex items-center gap-2">
                        <TriangleAlert className="size-5" />
                            Patch 1.2 Alert!
                        <TriangleAlert className="size-5" />
                    </AlertTitle>
                    <AlertDescription>
                        🔗 Your Convene URL now expires after 1 hour! ⏳ <br />
                        📈 To keep your pulls up to date, don&apos;t forget to open your in-game Convene History 🕹️ before re-importing. 🚀
                    </AlertDescription>
                </Alert> */}

                <Alert className="mt-4" variant="warning">
                    <AlertTitle className="flex items-center gap-2">
                        <TriangleAlert className="size-5" />
                        Important Update on the Convene Record History!
                        <TriangleAlert className="size-5" />
                    </AlertTitle>
                    <AlertDescription>
                        <p>
                            Starting <strong>November 22, 2024</strong>, the
                            WuWa server will begin
                            <strong>
                                {" "}
                                deleting convene history data older than 6
                                months{" "}
                            </strong>
                            .
                        </p>
                        <p>
                            🗓️ For example, if you are a Day 1 player and pulled
                            on <strong>May 22, 2024</strong>, those pulls will
                            be <strong>deleted on November 22, 2024</strong>{" "}
                            from
                            <strong> the WuWa server</strong>.
                        </p>
                        <p>
                            <strong>✨ WuWaPal</strong> will handle this issue
                            for you. but keeping a <strong>backup</strong> is
                            always a smart move! 💾✔️.
                        </p>
                        <p>
                            You can do it from{" "}
                            <Link
                                className="font-bold underline"
                                href="/settings"
                            >
                                Settings
                            </Link>
                            👈.
                        </p>
                    </AlertDescription>
                </Alert>

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
                    <IOSMethodList setConveneRecordURL={setConveneRecordURL} />
                </TabsContent>
            </Tabs>
            <div className="md:ml-28 ml-12 mt-4">
                <ImportBtn historyUrl={conveneRecordURL} gamePath={gamePath} />
            </div>
        </div>
    );
}
