import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import AddManualFilters from "@/components/banner/add-manual/AddManualFilters";
import {
    star_4_resonators,
    star_4_weapons,
    star_5_resonators,
    star_5_weapons,
} from "@/helpers/constants";
import SelectFilteredResource from "@/components/banner/add-manual/SelectFilteredResource";
import PityInput from "@/components/banner/add-manual/PityInput";
import { useBannerStore } from "@/stores/banner";
import { PullDateInput } from "@/components/banner/add-manual/PullDateInput";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { processAddItemToBanner } from "@/helpers/processors";

interface Props {
    banner_store_id: string;
}

export default function AddManuallyBtn({ banner_store_id }: Props) {
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [rarity, setRarity] = useState(4);
    const [resourceType, setResourceType] = useState(1);
    const [selectedResource, setSelectedResource] = useState<any>(null);
    const [filteredResources, setFilteredResources] = useState<any>([]);
    const [date, setDate] = useState<Date>(new Date());

    const [pityInput, setPityInput] = useState<string>("1");
    const bannerStore = useBannerStore<any>((state: any) => state);

    const handleSelectedResourceChange = (value: string) => {
        setSelectedResource(value);
    };

    const { toast } = useToast();

    const handleAddBtn = () => {
        if (!selectedResource) {
            toast({
                title: "Error",
                description: "Please select a resource",
                variant: "destructive",
            });
            return;
        }

        const copyBanner = { ...bannerStore.banners[banner_store_id] };
        copyBanner.total = copyBanner.total || 0;
        copyBanner.items = copyBanner.items || [];
        copyBanner.store_id = copyBanner.store_id || banner_store_id;

        const itemData = {
            n: selectedResource?.name,
            q: rarity,
            y: resourceType == 1 ? "r" : "w",
            p: +pityInput,
            i: "m",
            r: copyBanner.total + parseInt(pityInput),
            t: format(date as any, "yyyy-MM-dd HH:mm:ss"),
        };

        const updatedBanner = processAddItemToBanner(copyBanner, itemData);

        setSelectedResource(null);
        bannerStore.addBanner(banner_store_id, updatedBanner);

        toast({
            title: "Pull Added",
            variant: "success",
        });
    };

    useEffect(() => {
        setSelectedResource(null);
        if (rarity == 4) {
            setFilteredResources(
                resourceType == 1 ? star_4_resonators : star_4_weapons
            );
        } else {
            setFilteredResources(
                resourceType == 1 ? star_5_resonators : star_5_weapons
            );
        }
    }, [rarity, resourceType]);
    return (
        <>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Pulls Manually</DialogTitle>
                        <DialogDescription className="text-red-500 text-left">
                            Automatic Import or Refresh will overwrite any
                            manual changes you have made with official data.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-5">
                        <AddManualFilters
                            rarity={rarity}
                            setRarity={setRarity}
                            resourceType={resourceType}
                            setResourceType={setResourceType}
                        />

                        <div className="flex gap-3">
                            <SelectFilteredResource
                                selectedResource={selectedResource}
                                filteredResources={filteredResources}
                                setSelectedResource={setSelectedResource}
                                handleSelectedResourceChange={
                                    handleSelectedResourceChange
                                }
                            />

                            <PityInput
                                rarity={rarity}
                                pityInput={pityInput}
                                setPityInput={setPityInput}
                            />
                        </div>

                        <div>
                            <PullDateInput date={date} setDate={setDate} />
                        </div>

                        <div>
                            <Button className="w-20" onClick={handleAddBtn}>
                                Add
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {banner_store_id && (
                <Button
                    variant="ghostOutline"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Plus />
                    Add Manually
                </Button>
            )}
        </>
    );
}
