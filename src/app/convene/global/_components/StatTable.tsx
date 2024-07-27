import { Card, CardContent } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
import { Percent } from "lucide-react";
import React from "react";

interface Props {
    items: any;
    star: number;
}
export default function StatTable({ items, star }: Props) {
    return (
        <Card>
            <CardContent className="p-5">
                {star == 5 ? (
                    <div className="flex items-center gap-1 text-quality-5 text-xl">
                        5 ✦ List
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-quality-4 text-xl">
                        4 ✦ List
                    </div>
                )}
                <div className="flex flex-col">
                    <div className="grid grid-cols-4 border-b border-white p-4 text-muted-foreground">
                        <div className="col-span-2 flex justify-start">
                            Name
                        </div>
                        <div className="col-span-1 flex justify-end">Total</div>
                        <div className="col-span-1 flex justify-end">
                            <Percent />
                        </div>
                    </div>
                    <ScrollArea className="h-96 w-full z-0">
                        {Object.entries(items).map(([key, value]: any) => (
                            <React.Fragment key={key}>
                                <div className="grid grid-cols-4 p-4">
                                    <div className="col-span-2 flex justify-start">
                                        <div className="flex items-center gap-3 capitalize">
                                            <img
                                                className="size-10"
                                                src={`${
                                                    process.env
                                                        .NEXT_PUBLIC_IMAGE_URL
                                                }/combined/${key
                                                    .toLowerCase()
                                                    .replace(/:/g, "")
                                                    .replace(/ /g, "_")}.webp`}
                                                alt={key}
                                            />
                                            {key}
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex justify-end">{value.c}</div>
                                    <div className="col-span-1 flex justify-end">{value.p}</div>
                                </div>
                                <div>
                                    <div>
                                        <span
                                            className={` h-[2px] block ${
                                                star == 5
                                                    ? "bg-quality-5"
                                                    : "bg-quality-4"
                                            }`}
                                            style={{
                                                width: `${value.p}%`,
                                            }}
                                        ></span>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    );
}
