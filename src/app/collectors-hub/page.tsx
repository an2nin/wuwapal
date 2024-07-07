"use client";
import CollectionList from "./_components/CollectionList";
import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { processBannersForCollection } from "@/app/_helpers/processors";
import { RESONATORS } from "@/shared/resonators";
import { WEAPONS } from "@/shared/weapons";
import { useBannerStore } from "@/stores/banner";
import { useEffect, useState } from "react";
import PageHeader from "../_components/layout/PageHeader";

export default function CollectorsHub() {
    const [currentTab, setCurrentTab] = useState("resonator");
    const [processedCollection, setProcessedCollection] = useState<any>(null);
    const bannerStore = useBannerStore<any>((state: any) => state);

    useEffect(() => {
        const processed = processBannersForCollection(bannerStore.banners);
        setProcessedCollection(processed);
    }, [bannerStore]);

    return (
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-col gap-2">
                    <PageHeader title="Collector's Hub" />
                    <h2 className="text-lg font-bold">
                        {`${currentTab[0].toUpperCase()}${currentTab.slice(1)}`}{" "}
                        Collection
                    </h2>
                    <h3 className="text-sm text-muted-foreground max-w-3xl">
                        Note: Initially, the data is collected from the imported
                        convene records. However, you will be able to manually
                        add for the sequences and ranks obtained through rewards
                        (not yet implemented).
                    </h3>
                </div>
                <div>
                    <TabsList>
                        <TabsTrigger value="resonator">Resonators</TabsTrigger>
                        <TabsTrigger value="weapon">Weapons</TabsTrigger>
                    </TabsList>
                </div>
            </div>

            <div className="my-5"></div>

            <div
                className={`${currentTab === "resonator" ? "block" : "hidden"}`}
            >
                <CollectionList
                    type={currentTab}
                    resources={RESONATORS}
                    collected={processedCollection?.resonators}
                />
            </div>
            <div className={`${currentTab === "weapon" ? "block" : "hidden"}`}>
                <CollectionList
                    type={currentTab}
                    resources={WEAPONS}
                    collected={processedCollection?.weapons}
                />
            </div>
        </Tabs>
    );
}
