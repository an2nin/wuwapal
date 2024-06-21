import CollectionList from "@/components/collection/CollectionList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function MyCollections() {
    const [currentTab, setCurrentTab] = useState("resonator");

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
            
            <CollectionList type={currentTab} />
        </Tabs>
    );
}
