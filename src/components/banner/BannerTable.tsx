import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Star, Trash } from "lucide-react";
import AddManuallyBtn from "./add-manual/AddManuallyBtn";
import { processDeleteLastItemFromBanner } from "@/helpers/processors";
import { useBannerStore } from "@/stores/banner";
import PitySeverityIndicator from "../convene/PitySeverityIndicator";
interface Props {
    banner: any;
}
export default function BannerPullList({ banner }: Props) {
    const [filteredItems, setFilteredItems] = useState<any>([]);
    const [activeFilters, setActiveFilters] = useState<number[]>([4, 5]);
    const bannerStore = useBannerStore<any>((state: any) => state);

    const toggleFilter = (quality: number) => {
        setActiveFilters((prevFilters) =>
            prevFilters.includes(quality)
                ? prevFilters.filter((filter) => filter !== quality)
                : [...prevFilters, quality]
        );
    };

    useEffect(() => {
        const filteredObjects = banner.items.filter(
            (obj: any) =>
                activeFilters.length === 0 ||
                activeFilters.includes(obj.qualityLevel)
        );

        setFilteredItems(filteredObjects);
    }, [activeFilters, banner]);

    const handleDelete = (item: any) => {
        const updatedBanner = processDeleteLastItemFromBanner(banner, item);
       bannerStore.addBanner(updatedBanner.store_id, updatedBanner);
    };
    console.log(banner.store_id)
    return (
        <>
            <div className="flex flex-wrap gap-3 justify-between mb-5 items-center">
                <div>
                    <AddManuallyBtn banner_store_id={banner.store_id} />
                </div>
                <div className="flex gap-3 items-center">
                    <Button
                        onClick={() => toggleFilter(5)}
                        variant="ghost"
                        className={`!hover:bg-transparent ${
                            activeFilters.includes(5)
                                ? "bg-yellow-500 text-accent-foreground"
                                : "border-2 border-yellow-500 text-yellow-400"
                        }`}
                    >
                        <div className="flex items-center gap-1 text-lg">
                            5
                            <Star
                                className={`w-4 h-4 ${
                                    activeFilters.includes(5)
                                        ? "fill-accent-foreground"
                                        : "fill-yellow-500"
                                }`}
                            />
                        </div>
                    </Button>
                    <Button
                        onClick={() => toggleFilter(4)}
                        variant="ghost"
                        className={`!hover:bg-transparent ${
                            activeFilters.includes(4)
                                ? "bg-purple-500 text-accent-foreground"
                                : "border-2 border-purple-500 text-purple-400"
                        }`}
                    >
                        <div className="flex items-center gap-1 text-lg">
                            4
                            <Star
                                className={`w-4 h-4 ${
                                    activeFilters.includes(4)
                                        ? "fill-accent-foreground"
                                        : "fill-purple-500"
                                }`}
                            />
                        </div>
                    </Button>
                    <Button
                        onClick={() => toggleFilter(3)}
                        variant="ghost"
                        className={`!hover:bg-transparent ${
                            activeFilters.includes(3)
                                ? "bg-cyan-500 text-accent-foreground"
                                : "border-2 border-cyan-500 text-cyan-400"
                        }`}
                    >
                        <div className="flex items-center gap-1 text-lg">
                            3
                            <Star
                                className={`w-4 h-4 ${
                                    activeFilters.includes(3)
                                        ? "fill-accent-foreground"
                                        : "fill-cyan-500"
                                }`}
                            />
                        </div>
                    </Button>
                </div>
            </div>
            <Card>
                <CardContent className="h-full p-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="md:w-[20%]">Roll</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead></TableHead>
                                <TableHead></TableHead>
                                <TableHead >Pity</TableHead>
                                <TableHead className="w-[20%]">Time</TableHead>
                                <TableHead className="w-[5%]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.map((item: any, idx: number) => (
                                <TableRow
                                    key={idx}
                                    className={`${
                                        item.qualityLevel != 3
                                            ? item.qualityLevel == 4
                                                ? "bg-star-4"
                                                : "bg-star-5"
                                            : ""
                                    }`}
                                >
                                    <TableCell>{item.roll}</TableCell>
                                    <TableCell colSpan={3}>
                                        <div className="flex items-center gap-3">
                                            <img
                                                className="w-10 h-10"
                                                src={
                                                    process.env
                                                        .NEXT_PUBLIC_IMAGE_URL +
                                                    item.image_path
                                                }
                                                alt={item.name}
                                            />
                                            {item.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <PitySeverityIndicator pity={item.pity} maxPulls={item.qualityLevel == 5 ? 80 : 10} />
                                    </TableCell>
                                    <TableCell>{item.time}</TableCell>
                                    <TableCell>
                                        {item.import_type == "manual" &&
                                            idx == 0 && (
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                >
                                                    <Trash />
                                                </Button>
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
