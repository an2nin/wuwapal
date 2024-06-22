import CollectionList from "@/components/collection/CollectionList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RESONATORS, WEAPONS } from "@/helpers/constants";
import { processBannersForCollection } from "@/helpers/processors";
import { useBannerStore } from "@/stores/banner";
import { useEffect, useState } from "react";

export default function MyCollections() {
    const [currentTab, setCurrentTab] = useState("resonator");
    const [processedCollection, setProcessedCollection] = useState<any>(null);
    const bannerStore = useBannerStore<any>((state: any) => state);

    useEffect(() => {
        const processed = processBannersForCollection(bannerStore.banners);
        setProcessedCollection(processed);
    }, [bannerStore]);

    console.log(processedCollection);

    return (
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <div className="flex justify-between">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    {`${currentTab[0].toUpperCase()}${currentTab.slice(1)}`}{" "}
                    Collection
                </h1>
                <TabsList>
                    <TabsTrigger value="resonator">Resonators</TabsTrigger>
                    <TabsTrigger value="weapon">Weapons</TabsTrigger>
                </TabsList>
            </div>

            <h3 className="text-base my-2 text-muted-foreground max-w-5xl">
                Note: Initially, the data is collected from the imported convene
                records. However, you will be able to manually add for the sequences and
                ranks obtained through rewards (not yet implemented).
            </h3>

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
