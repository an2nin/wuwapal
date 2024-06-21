import CollectionList from "@/components/collection/CollectionList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
                records. However, you can manually add for the sequences and
                ascension obtained without pulling.
            </h3>

            {currentTab == "resonator" ? (
                <CollectionList
                    type={currentTab}
                    star4s={processedCollection?.star4_resonators}
                    star5s={processedCollection?.star5_resonators}
                />
            ) : (
                <CollectionList
                    type={currentTab}
                    star4s={processedCollection?.star4_weapons}
                    star5s={processedCollection?.star5_weapons}
                />
            )}
        </Tabs>
    );
}
