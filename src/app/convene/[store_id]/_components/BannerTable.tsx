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
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDateToHumanReadable } from "@/app/_helpers/time";
import { COMBINED } from "@/shared/combined";

interface Props {
    bannerData: any;
}

export default function BannerTable({ bannerData }: Props) {
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [activeFilters, setActiveFilters] = useState<number[]>([4, 5]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; // Change this to your desired items per page

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
        setCurrentPage(1); // Reset to first page whenever filters change
    }, [activeFilters, bannerData]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-wrap gap-5 lg:justify-between justify-center mb-5 items-center ">
                        <div className="flex gap-3 items-center lg:justify-start justify-center">
                            {[5, 4, 3].map((star) => (
                                <Button
                                    key={star}
                                    onClick={() => toggleFilter(star)}
                                    variant="ghost"
                                    className={`p-3 ${
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
                                    <div className="flex items-center text-lg">
                                        {star} ✦
                                    </div>
                                </Button>
                            ))}
                        </div>
                        <div className="flex items-center lg:justify-between justify-center">
                            <Button
                                variant="ghost"
                                className="text-primary font-bold"
                                size="icon"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronsLeft className="size-10" />
                            </Button>
                            <div className="flex gap-1">
                                {currentPage} <span>of</span>
                                {totalPages}
                            </div>
                            <Button
                                variant="ghost"
                                className="text-primary font-bold"
                                size="icon"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronsRight className="size-10" />
                            </Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-white">
                                <TableHead className="md:w-[15%]">
                                    Roll
                                </TableHead>
                                <TableHead className="w-[35%]">Name</TableHead>
                                <TableHead></TableHead>
                                <TableHead></TableHead>
                                <TableHead className="w-[25%]">Pity</TableHead>
                                <TableHead className="w-[25%]">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        {(bannerData?.items?.length ?? 0) > 0 ? (
                            <TableBody>
                                {currentItems?.map((item: any, idx: number) => (
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
                                                        item?.name in COMBINED
                                                            ? COMBINED[
                                                                  item?.name
                                                              ].icon ||
                                                              COMBINED[
                                                                  item?.name
                                                              ].image
                                                            : ""
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
                                ))}
                            </TableBody>
                        ) : null}
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
