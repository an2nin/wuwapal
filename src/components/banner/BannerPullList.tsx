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
import { Star } from "lucide-react";
interface Props {
    banner: any;
}
export default function BannerPullList({ banner }: Props) {
    const [filteredItems, setFilteredItems] = useState<any>([]);
    const [activeFilters, setActiveFilters] = useState<number[]>([4, 5]);
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

        console.log(filteredObjects)

        setFilteredItems(filteredObjects);
    }, [activeFilters]);

    return (
        <>
            <div className="flex justify-end gap-3 mb-5">
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
            <Card>
                <CardContent className="h-full p-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Roll</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Pity</TableHead>
                                <TableHead>Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.map((item: any, idx: number) => (
                                <TableRow
                                    key={idx}
                                    className={`${
                                        item.qualityLevel != 3
                                            ? item.qualityLevel == 4
                                                ? "bg-purple-500/40"
                                                : "bg-yellow-500/40"
                                            : ""
                                    }`}
                                >
                                    <TableCell>{item.roll}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.pity}</TableCell>
                                    <TableCell>{item.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
