"use client";
import CollectionList from "./_components/CollectionList";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { processBannersForCollection } from "@/shared/helpers/processors";
import { RESONATORS } from "@/data/resonators";
import { WEAPONS_FOUR_AND_FIVE_STARS } from "@/data/weapons";
import { useEffect, useState } from "react";
import PageHeader from "@/shared/components/layout/PageHeader";
import { useProfileStore, ProfileStoreState } from "@/shared/stores/profile";

export default function CollectorsHub() {
    const [currentTab, setCurrentTab] = useState("resonator");
    const [processedCollection, setProcessedCollection] = useState<any>(null);
    const profileStore = useProfileStore<ProfileStoreState>(
        (state: ProfileStoreState) => state
    );

    useEffect(() => {
        const banners = profileStore.getBanners();
        const processed = processBannersForCollection(banners);
        setProcessedCollection(processed);
    }, [profileStore]);

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
                    resources={WEAPONS_FOUR_AND_FIVE_STARS}
                    collected={processedCollection?.weapons}
                />
            </div>
        </Tabs>
    );
}
