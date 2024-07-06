import PitySeverityIndicator from "@/app/_components/banner/PitySeverityIndicator";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDateToHumanReadable } from "@/app/_helpers/time";

interface Props {
    bannerData: any;
}

export default function BannerTable({ bannerData }: Props) {
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [activeFilters, setActiveFilters] = useState<number[]>([4, 5]);

    const toggleFilter = (quality: number) => {
        setActiveFilters((prevFilters) =>
            prevFilters.includes(quality)
                ? prevFilters.filter((filter) => filter !== quality)
                : [...prevFilters, quality]
        );
    };

    useEffect(() => {
        const filteredObjects =
            bannerData?.items?.filter(
                (obj: any) =>
                    activeFilters.length === 0 ||
                    activeFilters.includes(obj?.qualityLevel)
            ) ?? [];

        setFilteredItems(filteredObjects);
    }, [activeFilters, bannerData]);
    return (
        <>
            <Card>
                <CardContent className="h-full p-5">
                    <div className="hidden bg-quality-5"></div>
                    <div className="flex flex-wrap gap-3 justify-between mb-5 items-center">
                        <div className="flex gap-3 items-center justify-end w-full">
                            {[5, 4, 3].map((star) => (
                                <Button
                                    key={star}
                                    onClick={() => toggleFilter(star)}
                                    variant="ghost"
                                    className={` ${
                                        activeFilters?.includes(star)
                                            ? `${
                                                  star === 5
                                                      ? "bg-quality-5"
                                                      : star === 4
                                                      ? "bg-quality-4"
                                                      : "bg-quality-3"
                                              } text-accent-foreground`
                                            : `border-2 ${
                                                  star === 5
                                                      ? "border-quality-5 text-quality-5"
                                                      : star === 4
                                                      ? "border-quality-4 text-quality-4"
                                                      : "border-quality-3 text-quality-3"
                                              }`
                                    }`}
                                >
                                    <div className="flex items-center gap-1 text-lg">
                                        {star}
                                        <Star
                                            className={`w-4 h-4 ${
                                                activeFilters?.includes(star)
                                                    ? "fill-accent-foreground"
                                                    : `${
                                                          star === 5
                                                              ? "fill-quality-5"
                                                              : star === 4
                                                              ? "fill-quality-4"
                                                              : "fill-quality-3"
                                                      }`
                                            }`}
                                        />
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="md:w-[20%]">
                                    Roll
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead></TableHead>
                                <TableHead></TableHead>
                                <TableHead>Pity</TableHead>
                                <TableHead className="w-[25%]">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        {(bannerData?.items?.length ?? 0) > 0 ? (
                            <TableBody>
                                {filteredItems?.map(
                                    (item: any, idx: number) => (
                                        <TableRow
                                            key={idx}
                                            className={`border-b border-white/30 ${
                                                item?.qualityLevel != 3
                                                    ? item?.qualityLevel == 4
                                                        ? "bg-star-4"
                                                        : "bg-star-5"
                                                    : ""
                                            }`}
                                        >
                                            <TableCell>{item?.roll}</TableCell>
                                            <TableCell colSpan={3}>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        className="w-10 h-10"
                                                        src={
                                                            process.env
                                                                .NEXT_PUBLIC_IMAGE_URL +
                                                            item?.image_path
                                                        }
                                                        alt={item?.name}
                                                    />
                                                    {item?.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <PitySeverityIndicator
                                                    pity={item?.pity}
                                                    maxPulls={
                                                        item?.qualityLevel == 5
                                                            ? 80
                                                            : 10
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {formatDateToHumanReadable(
                                                    new Date(item?.time)
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        ) : null}
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
